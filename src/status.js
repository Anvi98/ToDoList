
const getContainer = (newContainer) => {
  let d = [...newContainer.querySelectorAll("input")];
  d.forEach(input =>{
    input.addEventListener('change', (e)=>{
      if(e.target.checked){
        input.parentNode.classList.add('desc');
      } else {
        input.parentNode.classList.remove('desc');
      };
      
    });
  });
};

export {getContainer};