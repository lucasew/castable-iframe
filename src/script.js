(function () {
  const params = new URLSearchParams(window.location.search)
  const url = params.has('url') ? params.get('url') : prompt("URL:")
  document.getElementById('content').src = url
})()
