import {FaEdit, FaTrash} from "react-icons/fa";
import Button from "./Button.jsx";

export function TaskItem({
                             id,
                             name,
                             complete,
                             ToggleTask,
                             RemoveTask,
                             StartEdit,
                             SaveEdit,
                             CancelEdit,
                             isEditing,
                             editText,
                             setEditText,
                             priority,
                             category,
                             dueDate,
                             className
                         }) {

    const NormalView = () => (
        <div>
            <label>
                <input
                    type={'checkbox'}
                    checked={complete}
                    onChange={e => ToggleTask(id, e.target.checked)}
                />
                <span>{name}</span>
                <span>{priority}</span>
            </label>
            <Button className={className} label={<FaTrash/>} parenthMetod={() => RemoveTask(id)}/>
            <Button className={className} label={<FaEdit/>} parenthMetod={() => StartEdit(id)}/>
            <span>{category}</span>
            <span>{`date: ${dueDate}`}</span>
        </div>
    );

    const EditView = () => (
        <div>
            <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
            />
            <Button label={'Guardar'} parenthMetod={SaveEdit}/>
            <Button label={'Cancelar'} parenthMetod={CancelEdit}/>
        </div>
    );

    return (
        <li key={id}>
            {isEditing ? <EditView/> : <NormalView/>}
        </li>
    );
}