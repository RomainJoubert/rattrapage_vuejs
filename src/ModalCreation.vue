<template>
  <div>
    <b-modal :hide-footer="true" id="modal1" title="Bootstrap-Vue" ref="myModalRef">
      <input value="" type="text" class="form-control donnees" v-model="projectName" placeholder="nom projet" size="30">
      <!--<input type="text" class="form-control" v-model="authorName" placeholder="votre nom" size="30">-->
      <input type="text" class="form-control donnees" v-model="description" placeholder="description" size="30">
      <input type="text" class="form-control donnees" v-model="collaborateur" placeholder="collaborateurs" size="30">
      <div>
        <br/>
        <button id="submitProject" type="submit" class="btn btn-success" @click="addProject();modalOff()">Valider
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ModalCreation",

    data() {
      return {
        projectName: '',
        description: '',
        collaborateur: ''
      }
    },

    methods: {
      modalOff: function () {
        this.projectName = "";
        this.description = "";
        this.$refs.myModalRef.hide();
      },
      addProject: function () {
        axios.post('https://daily-standup-campus.herokuapp.com/api/projects?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjNmODIzYTM5YjlmMDAxNGViNGJlNiIsImlhdCI6MTUzMTE0Mjg1MX0.K5e_nO1kl0sOOK8rvjYTiRkHPk2vBoGcSGY0Xh3zVQg',
          {name: this.projectName, description: this.description, collaborators: []})
          .then(response => {
            this.$emit('nouveauProjet', response.data);
          })
          .catch(error => {
            this.error.push(error)
          })
      }
    }
  }

</script>

<style scoped>

</style>
