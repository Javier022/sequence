<script>
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },

  data() {
    return {
      sequence: [],
      randomPosition: 0,
      entryNumber: "",
      successPercentage: 0,
      attempt: 0,
      count: 0,
      incorretNumber: 0,
      reset: false,
      timer: null,
    };
  },
  watch: {
    attempt: (value) => {
      console.log(value);
      if (value === 5) return;
    },
  },
  methods: {
    generateSequence() {
      const sequenceGenerated = this.generateRandomNumbers();
      const firstIndexSequence = sequenceGenerated[0];
      const lastIndexSequence = sequenceGenerated[sequenceGenerated.length - 1];
      const getRandomPosition = this.randomNumber(firstIndexSequence, lastIndexSequence);

      this.randomPosition = getRandomPosition;
      this.sequence = sequenceGenerated;
    },
    generateRandomNumbers() {
      const iterations = [1, 2, 3, 4, 5, 6, 7];
      const randomIndex = this.randomNumber(1, 4);
      const sequence = iterations.map((_, index) => randomIndex + index);
      return sequence;
    },
    validateNumber() {
      if (!this.entryNumber) {
        return;
      }

      if (this.entryNumber !== this.randomPosition) {
        this.entryNumber = "";
        this.attempt++;

        this.generateSequence();
        return this.executeValidateNumber();
      }

      this.entryNumber = "";
      this.attempt++;
      this.successPercentage = this.successPercentage + 20;

      this.generateSequence();
      this.executeValidateNumber();
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    executeValidateNumber() {
      if (this.attempt === 5) return;

      if (this.attempt === 0) {
        return this.generateSequence();
      }

      if (this.entryNumber) {
        if (!this.timer) return;

        clearTimeout(this.timer);
        return this.validateNumber();
      }
    },
    clearAndExecuteValidateNumber() {
      this.attempt = 0;
      this.successPercentage = 0;
      this.entryNumber = "";
      this.attempt++;

      this.executeValidateNumber();
    },
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.entryNumber = this.randomPosition + 1;
      console.log("se ejecuto mounted");
      this.validateNumber();
    }, 10000);
    this.executeValidateNumber();
  },
  updated() {
    console.log(this.attempt, "update executed");
    if (this.attempt) {
      this.timer = setTimeout(() => {
        this.entryNumber = this.randomPosition + 1;
        console.log("se ejecuto el update");
        this.executeValidateNumber();
        // this.validateNumber();
      }, 10000);

      this.count = 0;
    }
  },
};
</script>

<template>
  <main class="container">
    <div>
      <p>Acierto: {{ successPercentage }}%</p>
      <p>Intentos: {{ attempt }}</p>
      <p>Timer: {{ count }}</p>
      <Card title="Completa la Secuencia">
        <template #default>
          <div class="card">
            <h3
              v-show="attempt < 5"
              class="card__number"
              v-for="number in sequence"
              v-bind:key="number"
            >
              <input
                class="card__entry"
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
          <button v-show="attempt < 5" @click="executeValidateNumber">RESPONDER</button>
          <button v-show="attempt === 5" @click="clearAndExecuteValidateNumber">
            CONTINUAR
          </button>
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
  padding: 25px 35px;
  border-radius: 5px;
}

.card__body {
  display: flex;
}

.card__number {
  display: flex;
  font-size: 25px;
  flex: 1;
  justify-content: space-between;
}

.card__entry {
  width: 100%;
  display: flex;
}
</style>
