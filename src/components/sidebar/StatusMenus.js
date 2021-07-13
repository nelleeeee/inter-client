import { useHistory } from "react-router-dom";

function StatusMenus({ id, name, count }) {
  const history = useHistory();

  return (
    <div
      id={id}
      onClick={() =>
        history.push({
          pathname: "/stocktable",
          state: { id: id },
        })
      }
      className="flex justify-between cursor-pointer hover:text-gray-50"
    >
      <div className="pr-4">{name} </div>
      <div>{count}</div>
    </div>
  );
}

export default StatusMenus;
