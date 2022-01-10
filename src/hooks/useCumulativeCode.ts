import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string, activeTab) => {
  return useTypedSelector((state) => {
    const { data, order } = state.files.files[activeTab];
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
        import _React from 'react';
        import _reactDOM from 'react-dom';
        var show = (value) => {
          let argument = value
          if(typeof value === 'object') {
            if( value.$$typeof && value.props) {
              
            } else {
              argument = JSON.stringify(value)
            }
          }
          _reactDOM.render(argument,document.querySelector('#root'))
        }
        `;
    const showFuncNoOp = "var show = () => {}";
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
