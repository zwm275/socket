<template>
  <div class="personcontainar">
    <div class="left">
      <ul>
        <li>
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>张三</span>
            </div>
          </div>
        </li>
        <li>
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>张三</span>
            </div>
          </div>
        </li>
        <li>
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>张三</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">person</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.personcontainar {
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    ul {
      list-style-type: none;
      display: inline-block;
      margin-left: 30px;
      li {
        // background-color: skyblue;
        margin-bottom: 10px;
        height: 52px;
        .content {
          display: flex;
          justify-content: start;
          align-items: center;
          .img {
            width: 50px;
            height: 50px;
            background-color: green;
            border-radius: 50%;
          }
          .detail {
            margin-left: 10px;
            width: 200px;
            span {
              transform: translateY(-50%);
              line-height: 20px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
  .right {
    margin-left: 20px;
  }
}
</style>
