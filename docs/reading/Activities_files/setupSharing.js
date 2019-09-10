function setupSharing() {
  var shareButton = document.querySelector("button.share-this"),
    shareLinkList = document.querySelector("ul.links"),
    canonicalUrlLinkElem = document.querySelector('link[rel=canonical]'),
    pageUrl = canonicalUrlLinkElem ? canonicalUrlLinkElem.href : document.URL,
    title = document.querySelector("meta[name='og:title']").getAttribute("content"),
    description = document.querySelector("meta[name='description']").getAttribute("content");
  function setShareLinks() {
    var pageUrl = document.URL,
      emailLinkEl = document.querySelector(".share.email > a");
    var descrUrlComp = encodeURIComponent( description);
    document.querySelector(".share.facebook").addEventListener("click", function () {
      url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
      window.open(url,"NewWindow","");
    });
    document.querySelector(".share.twitter").addEventListener("click", function () {
      url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + descrUrlComp;
      window.open(url,"NewWindow","");
    });
    document.querySelector(".share.linkedin").addEventListener("click", function () {
      url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
      window.open(url,"NewWindow","");
    });
    emailLinkEl.href = "mailto:?subject=" + title + "&body=" + description + "%0A%0A" + pageUrl;  
  };

  if (navigator.share) {
    shareButton.style.display = "inline"
    shareButton.addEventListener('click', function () {
    navigator.share({
      title: title,
      url: pageUrl,
      text: description
    }).then( function () {
      console.log("Thanks for sharing!");
    })
    .catch( console.error);
    });
  } else {
    shareLinkList.style.display = "inline-block";
    setShareLinks();
  }
}
window.onload = setupSharing;
