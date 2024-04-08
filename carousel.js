// jQuary版本
$("#next").on("click", () => {
  // 要緊鄰著中間無空格
  let current = $(".image.active");
  let dot = $(".dot.active");
  current.removeClass("active");
  dot.removeClass("active animate__animated animate__rubberBand");
  let next = current.next(".image").length
    ? current.next(".image")
    : $(".image").first();
  let nextDot = dot.next(".dot").length ? dot.next(".dot") : $(".dot").first();
  next.addClass("active");
  nextDot.addClass("active animate__animated animate__rubberBand");
});
$("#prev").on("click", () => {
  // 要緊鄰著中間無空格
  let current = $(".image.active");
  let dot = $(".dot.active");
  current.removeClass("active");
  dot.removeClass("active animate__animated animate__rubberBand");
  let prev = current.prev(".image").length
    ? current.prev(".image")
    : $(".image").last();
  let prevDot = dot.prev(".dot").length ? dot.prev(".dot") : $(".dot").last();
  prev.addClass("active");
  prevDot.addClass("active animate__animated animate__rubberBand");
});

// ■■■下方條按鈕■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
$(".dot").on("click", function () {
  let clickDot = $(this).index();
  let images = $(".image");
  let dots = $(".dot");
  images.removeClass("active");
  dots.removeClass("active animate__animated animate__rubberBand");
  let clickAddActiveImage = images.eq(clickDot);
  let clickAddActiveDot = dots.eq(clickDot);
  clickAddActiveImage.addClass("active");
  clickAddActiveDot.addClass("active animate__animated animate__rubberBand");
});

// ■■■圖片連結■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const websiteLinks = [
  "https://www.kkday.com/zh-my/blog/338/taiwan-must-go",
  "https://blog.settour.com.tw/special-plan/taiwan-japanese-attractions",
  "https://www.eztravel.com.tw/events/taiwanpromo/",
  "https://asiayo.com/event/taiwan_twfit.html",
  "https://explorethesun.tw/story_detail.php?id=54",
];

$(".image").on("click", function () {
  let clickImgFromDot = $(".dot.active").index();
  window.open(websiteLinks[clickImgFromDot], "_blank");
});

// ■■■按鈕微動畫■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
$(".ctrl_btn").each(function () {
  $(this).on("click", function (e) {
    let ctrlI = $(this).find(".ctrl_i");
    ctrlI.removeClass("animate__animated animate__rubberBand");
    // 強制重新繪製，以觸發動畫
    void ctrlI[0].offsetWidth;
    ctrlI.addClass("animate__animated animate__rubberBand");
  });

  $(this).on("mouseenter", function (e) {
    let ctrlI = $(this).find(".ctrl_i");
    ctrlI.addClass("animate__animated animate__rubberBand");
  });
  $(this).on("mouseleave", function (e) {
    let ctrlI = $(this).find(".ctrl_i");
    ctrlI.removeClass("animate__animated animate__rubberBand");
  });
});

// ■■■自動撥放■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
let timerId = setInterval(function () {
  $("#next").click();
}, 3000);
const slider = $(".ctrl");
slider.on("mouseenter", function () {
  clearInterval(timerId);
});
slider.on("mouseleave", function () {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(function () {
    $("#next").click();
  }, 3000);
});
