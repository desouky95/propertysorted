import gulp, { series } from "gulp";
import imagemin from "gulp-imagemin";
import tt from "imagemin";
import webp from "imagemin-webp";
import replace from "gulp-ext-replace";
import rename from "gulp-rename";
import { deleteAsync } from "del";
import through from "through2";

gulp.task("clear", async function () {
  await deleteAsync(["dist", "assets"]);
});
gulp.task("webp", async function () {
  gulp
    .src("./public/**/*.{jpg,jpeg,png}")
    .pipe(
      through.obj(async (file, enc, cb) => {
        tt.buffer(file,{
            plugins: [webp()]
        }).then( (value) => {
            console.log()
            cb(null, value);
        })
        // const __ = await tt(file.contents, { plugins: [webp()] });
        // console.log(__);
      })
    )
    .pipe(replace(".webp"))
    .pipe(gulp.dest("assets"));
});

const fn = (stream) => {
  const stream2 = new WritableStream();
  return stream2;
};

export default series("clear", "webp");
