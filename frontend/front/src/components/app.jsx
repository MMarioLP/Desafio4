
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/table.css';
import {Registro,Tables} from './registro';

function Agregar() {
  return (
    <div className="Regis" >
      <div className='tab' >
      <Tables/>
      </div>
      <div className='regis'>
    <Registro/>
    </div>

    </div>
  );
}

export default Agregar;