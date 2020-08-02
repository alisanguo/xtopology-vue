<template>
  <div>
    <div class="upload-container">
      <el-upload
        class="upload-image"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-remove="handleRemove"
        :on-error="handleError"
        :show-file-list="false"
        list-type="picture"
      >
        <el-button size="mini" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png文件，小于500kb</div>
      </el-upload>
      <div class="flex wrap">
        <div
          class="image"
          v-for="(item, index) in images"
          :key="index"
          :class="{active: item.image === image}"
          draggable="true"
          @dragstart="onDrag($event, item)"
          @touchstart="onTouchstart(item)"
        >
          <img :src="item.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [{ image: require("../../public/img/logo.png") }],
      image: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {},
    handleError(err, file, fileList) {
      this.images.unshift({
        image: require("../../public/img/logo.png") 
      })
    },
    onDrag(event, image) {
      if (image) {
        event.dataTransfer.setData(
          "Text",
          JSON.stringify({
            name: "image",
            rect: {
              width: 100,
              height: 100
            },
            image: image.image
          })
        );
      }
    },

    onTouchstart(item) {
      // this.canvas.touchedNode = item.data;
    }
  }
};
</script>
<style src="../../assets/css/variables.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.upload-image {
  padding: 10px;
}
.flex.wrap {
  align-content: flex-start;
  overflow: auto;

  .icon {
    width: 0.7rem;
    height: 0.7rem;
    display: inline-block;
    text-align: center;
    padding: 0.1rem;
    margin-bottom: 0.01rem;
    border: 1px solid transparent;

    i {
      font-size: 0.4rem;
      line-height: 1;
    }

    &:hover {
      border-color: $color-primary;
    }

    .blank {
      margin: 0.1rem auto;
    }
  }

  .image {
    margin: 0.2rem 0.05rem 0;
    width: 0.6rem;
    height: 0.6rem;
    display: inline-block;
    text-align: center;
    position: relative;

    &.text {
      line-height: 0.56rem;
      color: $color-gray;
    }

    img {
      height: 100%;
    }

    .icon-close {
      line-height: 1;
      position: absolute;
      top: 0.05rem;
      right: 0.05rem;
      cursor: pointer;
      display: none;
      &:hover {
        color: $color-primary;
      }
    }

    &:hover {
      border-color: $color-primary;
      .icon-close {
        display: block;
      }
    }
  }

  .active {
    border: 1px solid $color-primary;
    color: #fff;
  }

  &.small {
    min-width: 1.8rem;

    .image {
      width: 0.5rem;
      height: 0.5rem;
      cursor: pointer;

      &.text {
        line-height: 0.5rem;
      }
    }
  }
}
</style>