<template>
  <div>
    <!-- 选中为空 -->
    <div v-if="!props.node && !props.line && !props.multi">
      <div class="title">小提示</div>
      <ul class="group">
        <li>方向键：控制节点移动5个像素</li>
        <li>Ctrl + 方向键：控制节点移动1个像素</li>
        <li>Ctrl + 鼠标移动：移动整个画布</li>
        <li>Ctrl + 鼠标滚轮：缩放</li>
        <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
      </ul>
    </div>
    <!-- 选中节点 -->
    <div v-if="props.node">
      <div class="title">位置和大小</div>
      <div class="items">
        <div class="flex grid">
          <div>X（px）</div>
          <div class="ml5">Y（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.x"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.y"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div>宽（px）</div>
          <div class="ml5">高（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.width"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.height"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="items" v-if="props.node.is3D">
        <div class="flex grid">
          <div>Z（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number v-model="props.node.z" controls-position="right" @change="onChange"></el-input-number>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div title="百分比%对应的小数值">圆角（0 - 1）</div>
          <div class="ml5">旋转（°）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.borderRadius"
              controls-position="right"
              @change="onChange"
              :min="0"
              :max="1"
              :step="0.1"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rotate"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div title="padding-left">内边距-左</div>
          <div title="padding-right" class="ml5">内边距-右</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input
              size="small"
              v-model="props.node.paddingLeft"
              controls-position="right"
              @change="onChange"
            ></el-input>
          </div>
          <div class="ml5">
            <el-input
              size="small"
              v-model="props.node.paddingRight"
              controls-position="right"
              @change="onChange"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div title="padding-top">内边距-上</div>
          <div title="padding-bottom" class="ml5">内边距-下</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input
              size="small"
              v-model="props.node.paddingTop"
              controls-position="right"
              @change="onChange"
            ></el-input>
          </div>
          <div class="ml5">
            <el-input
              size="small"
              v-model="props.node.paddingBottom"
              controls-position="right"
              @change="onChange"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="items gray" style="line-height: 1.5">内边距：输入数字表示像素；输入%表示百分比</div>
      <div class="title"></div>
      <div class="items">
        <div class="flex grid">
          <div class="custom-data">
            自定义数据
            <i
              :class="props.expand ? 'el-icon-zoom-out' : 'el-icon-zoom-in'"
              @click="changeExpand"
              size="small"
            >{{props.expand ? '缩小' : '放大'}}</i>
          </div>
        </div>
        <div class="flex grid">
          <div :class="props.expand ? 'expand-data' : ''">
            <el-input
              type="textarea"
              v-model="nodeData"
              :rows="props.expand ? 15 : 3"
              @change="onChange"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 选中线条 -->
    <div v-if="props.line">
      <div class="title">样式</div>
      <!-- <el-dropdown @command="handleCommand">
        <i :class="`iconfont icon-${props.line.name}`"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in lineNames" :key="index" :command="item">
            <i :class="`iconfont icon-${item}`"></i>
          </el-dropdown-item>
          
        </el-dropdown-menu>
      </el-dropdown> -->
      <div class="mt5">
        <div class="flex grid">
          <div>线条样式</div>
          <div >连线类型</div>
        </div>
        <div class="flex grid mt5">
          <div class="mr5 rel">
            <div
              class="input"
              @click="$event.stopPropagation(); drowdown = 1"
            >
              <div class="icon-item" :class="{hidden: props.line.dash !== 0}">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item" :class="{hidden: props.line.dash !== 1}">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="5 5" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item" :class="{hidden: props.line.dash !== 2}">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10 10" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item" :class="{hidden: props.line.dash !== 3}">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10 10 2 10" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
            </div>
            <div class="dropdown" :class="{block: drowdown === 1}">
              <div class="icon-item ph10 pv5" @click="onClickDash(0)">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item ph10 pv5" @click="onClickDash(1)">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="5 5" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item ph10 pv5" @click="onClickDash(2)">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10 10" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
              <div class="icon-item ph10 pv5" @click="onClickDash(3)">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <g fill="none" stroke="black" stroke-width="1">
                    <path stroke-dasharray="10 10 2 10" d="M0 9 l85 0" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          
        </div>
     
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      nodeId: null,
      nodeIsJson: false,
      nodeData: "",
      lineNames: ["curve", "polyline", "line", "mind"],
      drowdown: 0
    };
  },
  props: {
    props: {
      type: Object,
      require: true
    }
  },
  updated() {
    if (!this.props.node || this.nodeId === this.props.node.id) {
      return;
    }
    this.props.expand = false;
    this.nodeId = this.props.node.id;
    let originData = this.props.node.data;
    this.nodeIsJson = this.isJson(originData);
    this.nodeData = this.nodeIsJson
      ? JSON.stringify(originData, null, 4)
      : (this.nodeData = originData);
  },
  methods: {
    onChange(value) {
      if (this.props.node) {
        this.props.node.data = this.nodeIsJson
          ? JSON.parse(this.nodeData)
          : this.nodeData;
      }
      this.$emit("change", this.props.node);
    },
    changeExpand() {
      this.props.expand = !this.props.expand;
    },
    isJson(obj) {
      return (
        typeof obj == "object" &&
        Object.prototype.toString.call(obj).toLowerCase() ==
          "[object object]" &&
        !obj.length
      );
    },
    handleCommand(command) {
      console.log(this.props.line.name);
      this.props.line.name = command
      
      this.onChange()
    },
    onClickDash(dash) {
      this.props.line.dash = dash
      this.drowdown = 0
      this.onChange()
    }
  }
};
</script>

<style lang="scss">
.star {
  display: block;
  color: #f60 !important;
  text-decoration: underline;
  margin-bottom: 0.1rem;
}

.title {
  color: #0d1a26;
  font-weight: 600;
  padding: 0.05rem 0.15rem;
  border-bottom: 1px solid #ccc;
}

.group {
  margin: 0.1rem 0 0.2rem 0.3rem;
  padding: 0;

  a,
  li {
    line-height: 2;
  }

  li {
    list-style: initial;
  }
}

.bottom {
  position: absolute;
  bottom: 0.1rem;
}

.items {
  padding: 0.05rem 0.15rem;

  .el-input-number {
    width: 1.02rem;
    line-height: 0.32rem;

    .el-input__inner {
      padding-left: 0;
      padding-right: 40px;
      height: 0.34rem;
      line-height: 0.34rem;
    }

    .el-input-number__increase {
      line-height: 0.16rem;
    }
  }

  .custom-data i {
    cursor: pointer;
    float: right;
    color: #409eff;
    height: 2em;
    line-height: 2em;
  }

  .expand-data {
    position: absolute;
    right: 0.15rem;
    width: 5rem;
  }
}

.formItem {
  margin-bottom: 0.1rem;
}
</style>
