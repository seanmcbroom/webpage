<script setup lang="ts">
import axios from 'axios'
import { Button } from '../ButtonElement'
import { ref } from 'vue'

const name = ref<string>('')
const email = ref<string>('')
const subject = ref<string>('')
const message = ref<string>('')

const handleSubmit = () => {
  axios
    .post('/api/contact-form', {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    })
    .catch(() => console.error('Error submitting form'))
}
</script>

<template>
  <form id="contact-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" name="name" required />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" name="email" required />
    </div>

    <div class="form-group">
      <label for="subject">Subject:</label>
      <input type="text" id="subject" v-model="subject" name="subject" required />
    </div>

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" v-model="message" name="message" rows="5" required></textarea>
    </div>

    <Button :text="'Submit'" :onClick="handleSubmit"></Button>
  </form>
</template>

<style scoped>
#contact-form {
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 50%;
}

.form-group {
  width: 80%;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
}

textarea {
  resize: vertical;
}

button[type='submit'] {
  background-color: #353535;
  color: white;

  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #444;
}

legend {
  font-size: 1.2em;
  font-weight: bold;
}

@media (max-width: 1024px) {
  #contact-form {
    width: 100%;
  }
}
</style>
