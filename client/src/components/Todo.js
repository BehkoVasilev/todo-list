export default function Todo({
    id,
    text,
    isCompleted,
    toggleTodostatus,
    deleteTodo
}) {
    return (
        <tr className={`todo ${isCompleted ? 'is-completed' : ''}`.trim()}>
            <td>{text}</td>
            <td>{isCompleted ? "Complete" : "Incomplete"}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => toggleTodostatus(id)}>Change status</button>
                <button className="btn todo-btn" onClick={() => deleteTodo(id)}>Delete</button>
            </td>
        </tr>
    );
};