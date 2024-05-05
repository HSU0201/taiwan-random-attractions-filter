let url = "./scenic_spot_C_f.json";
$(".attrCardContainer").on("click", ".attrInfoBtn", (e) => {
  $(".attrInfo").removeClass("active");
});

$.getJSON(url, function (elem) {
  const randomCard = 100;
  let datas = elem.XML_Head.Infos.Info;
  let filteredArray = datas.filter((item) => {
    return (
      item.Picture1 !== "" &&
      item.Region !== null &&
      item.OpenTime !== "" &&
      item.TicketInfo !== ""
    );
  });

  //==================================================================
  // Fisher-Yates modern shuffle演算法
  // const shuffledArray = [...filteredArray]; // 複製一份原始陣列

  // for (let i = shuffledArray.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j],shuffledArray[i],];
  // }
  // 可能效能更好，更適合應付大型專案????????
  //==================================================================
  let shuffledArray = [...filteredArray];

  // shuffledArray = datas.filter((item) => {
  //   console.log(item);
  //   return (
  //     item.Region == "臺中市" ||
  //     item.Region == "彰化縣" ||
  //     item.Region == "南投縣"
  //   );
  // });

  shuffledArray.sort(() => {
    return Math.random() - 0.5;
  });
  // =================================================================

  $(".attrCardContainer").empty();

  // ■■■■■插入卡片■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  shuffledArray.slice(0, randomCard).forEach((data, index) => {
    // console.log(data.Id);
    let template = `
      <div class="attrCard " data-index="${index}" data-id="${data.Id}">
        <img
          src="${data.Picture1}"
          class="attrCardImgTop"
          alt="..."
        />
        <div class="attrCardBody" data-number="${data.Region}">
          <h5 class="attrCardTitle">${data.Name}</h5>
          <div class="attrCardContent">
            <p class="attrCardText"><i class="bi bi-geo-alt"></i>${data.Town}</p>
            <a class="moreBtn" type="button">顯示更多</a>
          </div>
        </div>
      </div>`;
    $(".attrCardContainer").append(template);
  });

  // ■■■■■顯示旅遊地址詳細資訊■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  function showCover(index) {
    const selectattrCard = shuffledArray[index];

    // 空值合併運算子 (??)
    // 檢查[??]左操作數是否為 null 或 undefined，如果是，則使用[??]右操作數 ("資料尚未建構")。
    let travellinginfo = selectattrCard.Travellinginfo
      ? selectattrCard.Travellinginfo
      : "交通資料尚未建構";
    let picdescribe1 = selectattrCard.Picdescribe1
      ? selectattrCard.Picdescribe1
      : "尚無資訊";
    let name = selectattrCard.Name ? selectattrCard.Name : "姓名資料尚未建構";
    let opentime = selectattrCard.Opentime
      ? selectattrCard.Opentime
      : "資料尚未建構";
    let tel = selectattrCard.Tel ? selectattrCard.Tel : "電話資料尚未建構";
    let ticketinfo = selectattrCard.Ticketinfo
      ? selectattrCard.Ticketinfo
      : "資料尚未建構";
    let add = selectattrCard.Add ? selectattrCard.Add : "地址資料尚未建構";
    let description = selectattrCard.Description
      ? selectattrCard.Description
      : "資料尚未建構";
    let remarks = selectattrCard.Remarks
      ? selectattrCard.Remarks
      : "目前沒有資訊呦";

    let template = `
    <div class="attrBackground">11111
      <div class="attrInfo">
      <div class="btn btn-danger attrInfoBtn">X</div>
        <div class="infoTop row">
          
          <div class="attrMainImg col-md-5">
            <div class="attrImg">
              <img
                class="Picture1"
                src="${selectattrCard.Picture1}"
              />
              <span class="Picdescribe1 d-none d-lg-block"
                >${picdescribe1}</span
              >
            </div>
          </div>
          
          <div class="attrMainInfo col-md-5">
            <div>
              <span class="attrName">${name}</span>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="attrOpenTime">
                  開放時間 : <span>${opentime}</span>
                </div>
                <div class="attrTel">
                  連絡電話 : <span>${tel}</span>
                </div>
              </div>
              <div class="col">
                <div class="attrTicketInfo">景點費用 : <span>${ticketinfo}</span></div>
                <div class="attrAdd">
                  景點地址 : <span>${add}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="attrDescription">
          ${description}
        </div>
        <div class="attrTravellinginfo">
          <span>交通方式</span>
          <p>
            ${travellinginfo}
          </p>
        </div>
        <div class="attrToldescribe">
          ${picdescribe1}
        </div>
        <div class="attrRemarks" data-title="小知識">
          <span
            >${remarks}</span
          >
        </div>
      </div>
    </div>
    `;
    $(".attrCardContainer").append(template);
    $(".attrInfo").addClass("active");
  }

  // ■■■■■點擊卡片使其打開■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  $(".attrCardContainer").on("click", ".attrCard", (e) => {
    let that = e.currentTarget;
    const attrCardIndex = $(that).data("index");
    showCover(attrCardIndex);
  });
});
$(".left").on("click", function () {
  location.reload();
});
