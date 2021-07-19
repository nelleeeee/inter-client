import AddRow from "./AddRow";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const history = useHistory();

  const [requiredCols, setRequiredCols] = useState([]);

  const [addData, setAddData] = useState([]);

  const addProduct = () => {
    db.collection("products").doc("test").set(addData);
    history.push("/crproduct");
  };
  const onChange = e => {
    const { value, name } = e.target;

    setAddData({
      ...addData,
      [name]: value,
    });
  };
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
      <div>상품저장</div>

      <button onClick={addProduct}>저장하기</button>

      {requiredCols.map((col, index) => (
        <AddRow
          key={index}
          chName={col.id}
          cols={col.data}
          setAddData={setAddData}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
