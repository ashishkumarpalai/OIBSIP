
let arr = ["https://i.ytimg.com/vi/IBFVaJv0RZc/maxresdefault.jpg", "https://indiadesire.com/images/websitetopbanner-108042015.jpg", "https://images.ctfassets.net/wtodlh47qxpt/4gztBB8yAvtp6jV7JAuLD/093fddbb77a78a44a4d3d5e066c592de/KFC_Peri_Peri_Banner__1440x396px.jpg?w=1280&fit=fill&fm=webp", "https://i.pinimg.com/originals/f8/16/e5/f816e5bc505b7e0aec6b4a54e4c3f39f.jpg", "https://i.pinimg.com/originals/60/23/48/6023483602b2958e57a7f651628334c6.jpg", "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/cca71160275449.5a46380807b12.jpg", "https://images.ctfassets.net/wtodlh47qxpt/7p3qmgJkZyxS0SrYR3ApGT/5a28aaf50d424fa816f6d058d9086904/KFC_Celebration_Bucket_Banner__1440x396px.jpg?w=1280&fit=fill&fm=webp", "https://i.pinimg.com/originals/d6/f3/22/d6f322846b05b1f2bdf0b1b0b14e20df.jpg", "https://images.ctfassets.net/wtodlh47qxpt/4gztBB8yAvtp6jV7JAuLD/093fddbb77a78a44a4d3d5e066c592de/KFC_Peri_Peri_Banner__1440x396px.jpg?w=1280&fit=fill&fm=webp"]
let div = document.getElementById("poster")
let i = 0
let img = document.createElement("img")
img.src = arr[i]
div.append(img)


setInterval(() => {
    i++;
    if (i == arr.length - 1) {
        i = 0
    }

    img.src = arr[i]
    div.append(img)

}, 3000)
