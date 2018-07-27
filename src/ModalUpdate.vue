<template>
  <div>
    <b-modal :hide-footer="true" id="modal2" title="Bootstrap-Vue" ref="myRef">
      <input value="" type="text" class="form-control " v-model="projectNa" placeholder="nom projet" size="30">
      <!--<input type="text" class="form-control" v-model="authorName" placeholder="votre nom" size="30">-->
      <input type="text" class="form-control " v-model="descrip" placeholder="description" size="30">
      <input type="text" class="form-control " v-model="collaborat" placeholder="collaborateurs" size="30">
      <div>
        <br/>
        <button id="submitProj" type="submit" class="btn btn-success" @click="modifie">Valider
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
    export default {
        name: "ModalUpdate",

      methods:{
        modifie: function (id) {
          axios.put('https://daily-standup-campus.herokuapp.com/api/projects/' + id + '?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjNmODIzYTM5YjlmMDAxNGViNGJlNiIsImlhdCI6MTUzMTE0Mjg1MX0.K5e_nO1kl0sOOK8rvjYTiRkHPk2vBoGcSGY0Xh3zVQg',
            {name:this.projects.name, description:this.projects.description,collaborators:this.projects.collaborators})
            .then(response => {
              let tab4=update(this.projects, id);
              this.projects=tab4;
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
