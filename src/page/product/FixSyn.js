import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function FixSyn({ id }) {
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
  let synDatas = Object.entries(synData);
  synDatas = synDatas.sort();

  const { artist, channel, descrip, ent, imgUrl, relDate, thumbNail, title } =
    synData;

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
        <div className="flex-row">
          <div className="flex-col">
            <div>BTOB</div>
            {synDatas.map((data, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 h-10">
                <div>{data[0]}</div>
                <input
                  type="text"
                  name={data[0]}
                  value={data[1]}
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
