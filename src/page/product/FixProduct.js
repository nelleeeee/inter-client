import FixRow from "./FixRow";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
export default function FixProduct({ match }) {
  const { id } = match.params;
  console.log(match);
  const [requiredCols, setRequiredCols] = useState([]);
  useEffect(() => {
    db.collection("requiredCol").onSnapshot(snapshot => {
      setRequiredCols(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="flex-col w-9/12">
      {requiredCols.map((col, index) => (
        <FixRow key={index} id={id} chName={col.id} cols={col.data} />
      ))}
    </div>
  );
}
