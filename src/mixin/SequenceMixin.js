import { randomNumber } from "../helpers/index";

export const SequenceMixin = {
  data() {
    return {
      sequence: [],
      randomPosition: 0,
      entryNumber: "",
      successPercentage: 0,
      attempt: 0,
      incorretNumber: 0,
      reset: false,
      timer: null,
    };
  },
  watch: {
    attempt: (value) => {
      if (value === 5) return;
    },
  },
  methods: {
    generateSequence() {
      const sequenceGenerated = this.generateRandomNumbers();
      const firstIndexSequence = sequenceGenerated[0];
      const lastIndexSequence = sequenceGenerated[sequenceGenerated.length - 1];
      const getRandomPosition = randomNumber(
        firstIndexSequence,
        lastIndexSequence
      );
      this.randomPosition = getRandomPosition;
      this.sequence = sequenceGenerated;
    },
    generateRandomNumbers() {
      const iterations = [1, 2, 3, 4, 5, 6, 7];
      const randomIndex = randomNumber(1, 4);
      const sequence = iterations.map((_, index) => randomIndex + index);
      return sequence;
    },
    validateNumber() {
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

    executeValidateNumber() {
      if (this.attempt === 5) return;

      if (!this.entryNumber) {
        return;
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
};
