<template>
  <v-card>
    <v-card-title>
      dialog_options_occupation
    </v-card-title>



    <v-card-text>
      <v-form  v-model="valid" ref="form" validation>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          outline
          disabled
        ></v-text-field> <v-btn color="primary" dark @click="dialog2 = true">Open Dialog 2</v-btn>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          outline
        ></v-text-field>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          outline
        ></v-text-field>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          outline
        ></v-text-field>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          outline
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="onSubmit()"
            :disabled="!valid"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" flat @click=dialogExit()>Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default{
    data () {
      return {
        dialog2: false,
        valid: false
      }
    },
    props:['dialog_options_occupation'],
    methods: {
      onSubmit() {},
      dialogExit(){
        //this.child_dialog_options_.. = false; вместо false
        // зановится измененная переменная this.child_dialog_options_general.
        //В этом случае просто false
        this.$emit('exit-change',false)
      }
    }
  }
</script>
