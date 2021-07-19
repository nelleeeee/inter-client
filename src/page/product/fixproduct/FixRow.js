import { useEffect, useState } from "react";
import { db } from "../../../firebase";

export default function FixRow({ id, chName, cols }) {
  const [loading, setLoading] = useState(true);
  const [synData, setSynData] = useState([]);

  useEffect(() => {
    const productsDbCall = async () => {
      await db
        .collection("products")
        .doc(id)
        .get()
        .then(doc => {
          setSynData(doc.data());
        });
      setLoading(false);
    };
    productsDbCall();
  }, [id]);

  let data1 = [];
  let data2 = [];
  let keys = [];
  for (let key in cols) {
    data1.push(cols[key]);
    data2.push(synData[key]);
    keys.push(key);
  }

  const onChange = e => {
    const { value, name } = e.target;

    setSynData({
      ...synData,
      [name]: value,
    });
  };
  return (
    <>
      {!loading && (
        <div className="flex-row w-9/12">
          <div className="flex-col">
            <div>{chName}</div>

            {data1.map((data, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 h-10">
                <div>{data}</div>
                <input
                  type="text"
                  name={keys[index]}
                  value={data2[index]}
                  onChange={onChange}
                  className="shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
