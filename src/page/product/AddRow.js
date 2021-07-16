export default function AddRow({ chName, cols, onChange }) {
  let data1 = [];
  let keys = [];
  for (let key in cols) {
    data1.push(cols[key]);
    keys.push(key);
  }

  let value;

  return (
    <>
      <div className="flex-row w-9/12">
        <div className="flex-col">
          <div>{chName}</div>

          {data1.map((data, index) => (
            <>
              <div key={index} className="grid grid-cols-2 gap-2 h-10">
                <div>{data}</div>
                <input
                  type="text"
                  name={keys[index]}
                  value={value}
                  placeholder={
                    data1[index] === "출시일"
                      ? "0000.00.00"
                      : data1[index] === "썸네일"
                      ? "이미지 주소"
                      : data1[index] === "가격"
                      ? "원"
                      : data1[index]
                  }
                  onChange={onChange}
                  className="shadow-md"
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
