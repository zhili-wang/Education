<template>
  <section class="master-page-container" style="height: 100%">
    <div class="master-page-wrap">
      
      <div class="title-header" v-if="title">
        <div class="title-content">
          <div class="title-icon">
            <slot name="title-icon"></slot>
          </div>
          <p class="title">{{ title }}</p>
        </div>
        <div class="title-toolbar">
          <slot name="title-toolbar"></slot>
        </div>
      </div>

      <div class="master-page-search-content" v-if="$slots.searchContent">
        <slot name="searchContent"></slot>
      </div>

      <div
        class="master-page-content-toolbar"
        v-if="$slots.search || $slots.btns"
      >
        <div class="bar-search">
          <slot name="search"></slot>
        </div>

        <div class="bar-group">
          <slot name="btns"></slot>
        </div>
      </div>
      <!--$slots.content表示$slots里面是否存在content内容，就是说这里的占位符可填充了内容-->
      <div class="master-page-padding-content" v-if="$slots.paddingContent">
        <slot name="paddingContent"></slot>
      </div>
      <div class="master-page-nopadding-content" v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <div class="page-wrapper">
        <slot name="pager" />
      </div>
      <div class="chart-wrapper">
        <slot name="chart" />
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  mounted() {
    console.log("paddingContent=", this.$slots);
  },
  methods: {},
};
</script>

<style lang="postcss" scoped>
.master-page-container {
  background-color: #fff;
  & .master-page-wrap {
    & .title-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      border-bottom: 1px solid #dddee1;
      & .title-content {
        display: flex;
        align-items: center;
        & .title-icon {
          display: flex;
          align-items: center;
          margin-right: 5px;
        }
        & p.title {
          font-size: 20px;
          font-weight: bold;
        }
      }
      & .title-toolbar {
      }
    }
    & .master-page-search-content {
      padding: 15px;
      padding-bottom: 0;
    }
    & .master-page-content-toolbar {
      padding: 15px;
      padding-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dddee1;
      & .bar-search {
        &.input-search {
          width: 350px;
        }
      }
      & .bar-group {
      }
    }
    & .master-page-padding-content {
      padding: 15px;
      background: #fff;
      padding-bottom: 0;
    }
    & .master-page-nopadding-content {
      padding-bottom: 0;
      background: #fff;
      padding-left: 18px;
    }
    & .page-wrapper {
      padding: 15px;
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
