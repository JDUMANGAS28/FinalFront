<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-center">
            <span class="text-h6 m-2" style="color: #2F3F64">DENTAL CERTIFICATE</span>
            <hr>
            <v-text-field
              v-model="dental_data.date_created"
              class="d-flex justify-space-between float-right"
              align-center
              label="Date Created"
              type="date"
              outlined
              style="width: 200px;"
            ></v-text-field>
            <br>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="dental_data.name" label="Patient Name" type="text" outlined></v-text-field>
                
                <v-text-field v-model="dental_data.birthdate" label="Birthdate" type="date" outlined></v-text-field>

                <v-text-field v-model="dental_data.stud_id" label="Student ID" type="text" outlined></v-text-field>

                <v-text-field v-model="dental_data.dental_history" label="Dental History" type="text" outlined></v-text-field>

                <v-text-field v-model="dental_data.dental_issues" label="Dental Issues" type="text" outlined></v-text-field>

                <v-text-field v-model="dental_data.dental_issues" label="Examination Findings" type="text" outlined></v-text-field>
              
                
               ? 
              
                
              </v-col>
              <v-col cols="12" md="6">
                
                
                
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="white--text font-weight-bold"
                style="min-width: 150px; font-size: 16px;"
                @click="generate_pdf"
              >
                <v-icon left>mdi-file-pdf-box</v-icon>
                Generate Result
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  
  data: () => ({
    dental_data: {
      
      "date_created": "",
      "name": "",
      
      
      // "birthdate": "",
      // "age": "",
      // "blood_pressure": "",
      // "pulse_rate": "",
      // "vision_left": "",
      // "vision_right": "",
      
      // "weight": "",
      // "height": "",
      // "abdomen": "",
      // "extremities": "",
      // "skin": "",
      // "cvs": "",
      // "med_history": "",
      // "remarks": "",
  
    }
  }), 

  methods: {
    
      generate_pdf(){
        axios
          .post(
            "http://127.0.0.1:8000/api/generate-dental-certificate",
            this.dental_data
          )
          .then((response) => {
            console.log(response);
            window.open(response.data.download_link, '_blank');
          })
          .catch((error) => {
            // Handle error
            console.error("There was an error!", error);
          });
      },
    
  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;

}

</style>
