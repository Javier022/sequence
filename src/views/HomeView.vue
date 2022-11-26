<script>
import Card from "../components/Card.vue";
import Button from "../components/Button.vue";
import ButtonContinue from "../components/ButtonContinue.vue";
// mixin
import { SequenceMixin } from "../mixin/SequenceMixin";

export default {
  components: {
    Card,
    Button,
    ButtonContinue,
  },
  mixins: [SequenceMixin],
  watch: {
    attempt: (value) => {
      if (value === 5) return;
    },
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.entryNumber = this.randomPosition + 1;
      this.validateNumber();
    }, 10000);
    this.executeValidateNumber();
  },
  updated() {
    if (this.attempt) {
      this.timer = setTimeout(() => {
        this.entryNumber = this.randomPosition + 1;
        this.executeValidateNumber();
      }, 10000);
    }
  },
};
</script>

<template>
  <main class="container">
    <div>
      <Card>
        <template #header>
          <div class="card__title">
            <h1>{{ attempt === 5 ? "Desempeño" : "Completa la Secuencia" }}</h1>
            <h2 v-show="attempt === 5">{{ successPercentage }}%</h2>
          </div>
        </template>
        <template #default>
          <div class="card">
            <h3
              v-show="attempt < 5"
              class="card__number"
              v-for="number in sequence"
              v-bind:key="number"
            >
              <input
                class="card__input"
                v-if="randomPosition === number"
                type="number"
                name="randomPosition"
                v-model="entryNumber"
              />
              <p v-if="number !== randomPosition">{{ number }}</p>
            </h3>
          </div>
        </template>
        <template #footer>
          <Button v-show="attempt < 5" text="RESPONDER" :click="executeValidateNumber" />
          <ButtonContinue
            v-show="attempt === 5"
            :click="clearAndExecuteValidateNumber"
            text="CONTINUAR"
          />
        </template>
      </Card>
    </div>
  </main>
  >
</template>

<style>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
}

.card__title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card__number {
  display: flex;
  font-size: 25px;
  flex: 1;
  justify-content: center;
}

.card__input {
  width: 100%;
  display: flex;
  border: none;
  text-align: center;
  font-size: 20px;
  border: 1px dashed #a4a4a4;
  border-radius: 15px;
}

input:focus {
  outline: none;
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
