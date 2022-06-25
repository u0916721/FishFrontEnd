<template>
<div class="container-fluid">
    <div class="row" style="height: 100vh;">
        <div class="col-sm" id ="leftSide">
         <div class="text-center" style=" margin-top: 50vh;">
  Just Browse
</div>
        </div>
        <div class="col-sm" id="rightSide">
            <div class="text-center" style=" margin-top: 50vh;">
  <Login-component/>
</div>
        </div>
    </div>
</div>
</template>
<script>
import loginComponent from '../components/login-component.vue'
export default {
  components: { loginComponent },
  
mounted() { console.log('Test called')  }
}



</script>

<style scoped>
#leftSides {
  background:
  radial-gradient(circle at 100% 50%, transparent 20%, #20b65a 21%,
    #20b65a 34%, transparent 35%, transparent),
  radial-gradient(circle at 0% 50%, transparent 20%, #20b65a 21%, #20b65a 34%, transparent 35%, transparent) 0 -50px;
background-color: #EEEEEE;
background-size: 75px 100px;
}

#rightSide {
  background-color: #050505;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font-size: 1.2rem;
  padding: 1em 2em;
  letter-spacing: 0.05rem;
}
#rightSide:focus {
  outline: 2px dotted #55d7dc;
}
#rightSide {
  box-shadow: inset 0 0 0 4px #5ffbf1;
  color: #5ffbf1;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}
#rightSide::before,
#rightSide::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: "";
  pointer-events: none;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 0;
  right: 0;
}
#rightSide::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}
#rightSide::after {
  border-top-width: 4px;
  border-right-width: 4px;
}
#rightSide:hover {
  color: #ff71c6;
}
#rightSide:hover::before,
#rightSide:hover::after {
  border-color: #ff71c6;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}
#rightSide:hover::before {
  transition-delay: 0s, 0s, 0.25s;
}
#rightSide:hover::after {
  transition-delay: 0s, 0.25s, 0s;
}
#leftSides:hover {
  background-color: rgb(0, 0, 0);
}
</style>