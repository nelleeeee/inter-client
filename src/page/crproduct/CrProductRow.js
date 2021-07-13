import { useState } from "react";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
function CrProductRow({
  id,
  title,
  relDate,
  artist,
  ent,
  thumbNail,
  descrip,
  colNamesCh,
}) {
  // 수정기능. 행 클릭하면 창뜨게해서 수정
  // 왼쪽엔 평소엔 등록 수정상태에선 완료
  // 등록은 colNamesCh 이거 기준으로 매채별 등록
  const [fix, setFix] = useState(false);
  const fixHandle = () => {
    if (fix) {
      setFix(false);
    } else {
      setFix(true);
    }
  };

  const [fixeds, setfixeds] = useState({
    titleFix: title,
    relDateFix: relDate,
    artistFix: artist,
    entFix: ent,
    thumbNailFix: thumbNail,
    descripFix: descrip,
  });
  const { titleFix, relDateFix, artistFix, entFix, thumbNailFix, descripFix } =
    fixeds;

  const onChange = e => {
    const { value, name } = e.target;

    setfixeds({
      ...fixeds,
      [name]: value,
    });
  };

  const fixUpdate = () => {
    // if (
    //   albumNumberFix === "삭제" ||
    //   coverUrlFix === "삭제" ||
    //   albumNameFix === "삭제" ||
    //   priceArrowFix === "삭제" ||
    //   albumPriceFix === "삭제" ||
    //   quantityFix === "삭제"
    // ) {
    //   return db.collection("products").doc(id).delete();
    // }
    db.collection("products").doc(id).update({
      title: titleFix,
      relDate: relDateFix,
      artist: artistFix,
      ent: entFix,
      thumbNail: thumbNailFix,
      descrip: descripFix,
    });
    setfixeds({
      titleFix,
      relDateFix,
      artistFix,
      entFix,
      thumbNailFix,
      descripFix,
    });
    fixHandle();
  };

  // 비투비 목록에
  return (
    <>
      {!fix ? (
        <>
          {/* 디폴트 비투비 행 내용 랜더링 */}
          {colNamesCh === "btob" && (
            <>
              {" "}
              <div
                className="grid grid-cols-8 gap-2 pb-2"
                id={id}
                onClick={fixHandle}
              >
                <Link to={`/fixproduct/${id}`}>
                  <button>등록</button>
                </Link>
                <div
                  className="h-16 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${thumbNail})` }}
                ></div>

                <div className="col-span-3 truncate">{title}</div>
                <div>{relDate}</div>
                <div>가격</div>
              </div>
              <div hidden={!fix}>asdasdasd</div>
            </>
          )}
          {/*  빅커머스 행 내용 랜더링 */}
          {colNamesCh === "bigC" && (
            <div
              className="grid grid-cols-10 gap-2"
              id={id}
              onClick={fixHandle}
            >
              <button>등록</button>

              <div
                className="h-16 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${thumbNail})` }}
              ></div>
              <div className="col-span-3 truncate">{title}</div>
              <div>{relDate}</div>
              <div>{artist}</div>
              <div className="truncate">{ent}</div>
              <div className="truncate">{thumbNail}</div>
              <div className="truncate">{descrip}</div>
            </div>
          )}
        </>
      ) : (
        // 수정on 상태 랜더링
        <>
          <button onClick={fixUpdate}>저장</button>
          <input
            type="text"
            name="titleFix"
            value={titleFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="relDateFix"
            value={relDateFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="artistFix"
            value={artistFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="entFix"
            value={entFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="thumbNailFix"
            value={thumbNailFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="descripFix"
            value={descripFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
        </>
      )}
    </>
  );
}

export default CrProductRow;
