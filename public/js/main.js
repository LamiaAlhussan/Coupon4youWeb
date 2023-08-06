

var buttons = document.querySelectorAll(".cpnBtn");
buttons.forEach(function (cpnBtn) {
  cpnBtn.onclick = function () {
    var cpnCode = this.previousElementSibling;
    navigator.clipboard.writeText(cpnCode.innerHTML);
    cpnBtn.innerHTML = "COPIED";
    setTimeout(function () {
      cpnBtn.innerHTML = "COPY CODE";
    }, 3000);
  };
});

function deleteCoupon() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')

    axios.delete('/coupon4you/delete/'+id).then((res)=>{
       
        console.log(res.data)
        alert('event was deleted')
        window.location.href ='/coupon4you'
    }).catch((err)=>{
        console.log(err)
    })

}

function cancelEdit(value){
    let btn = document.getElementById('CancelBtn')
    
    window.location.href = value

}

function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("picture-preview");
        preview.src = src;
    }
}

