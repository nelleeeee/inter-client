import { Link } from "react-router-dom";
function CrProductRow({ id, requiredColsOb, product }) {
  let data = [];
  for (let key in requiredColsOb) {
    data.push(product.data[key]);
  }

  return (
    <>
      <div
        className={`grid grid-cols-${
          Object.keys(requiredColsOb).length + 1
        } gap-2 pb-2`}
        id={id}
      >
        <Link to={`/fixproduct/${id}`}>
          <button>등록/수정</button>
        </Link>
        {data.map(data =>
          data?.includes("https://firebasestorage") ? (
            <div
              key={data + "Row"}
              className="h-20 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${data})` }}
            ></div>
          ) : (
            <div key={data + "Row"}>{data}</div>
          )
        )}
      </div>
    </>
  );
}

export default CrProductRow;
