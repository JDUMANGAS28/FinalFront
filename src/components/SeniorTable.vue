<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
    
    
  >
    <template v-slot:top >
      <v-toolbar flat >
        <v-toolbar-title class="text-h6 font-weight-black " style="color: #2F3F64">Student Table</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
        v-model="search"
        class="w-auto mr-4 "
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
      
        <v-dialog v-model="dialog" max-width="1000px">

          <!-- button
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 rounded-l	" color="primary" dark v-bind="props" prepend-icon="mdi-plus">Add Record</v-btn>
          </template>
        -->

          <v-card >
            <v-card-title ><span class="text-h6 m-2" style="color: #2F3F64"  >{{ formTitle }}</span></v-card-title>
            <v-card-text > 
              <v-container >
                <v-row dense >
                  <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.student_lrn"
                    label="LRN*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email Address*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                cols="12"
                md="4"
                sm="6"
                ></v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.first_name"
                    label="First Name*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="4"
                >
                  <v-text-field
                    v-model="editedItem.middle_name"
                    hint="example of helper text only on focus"
                    label="Middle Name"
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="4"
                >
                  <v-text-field
                    v-model="editedItem.last_name"
                    label="Last Name*"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="1"
                  sm="4"
                >
                  <v-text-field
                    v-model="editedItem.extension"
                    label="Extension Name*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="2"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.sex_at_birth"
                    :items="['Male', 'Female', 'Other']"
                    label="Sex*"
                    required
                  ></v-select>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.birth_date"
                    label="Birthdate*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.birth_place"
                    label="Birthplace*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="2"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.civil_status"
                    :items="['Single','Married','Divorced']"
                    label="Civil Status*"
                    required
                  ></v-select>
                </v-col>
                
                <v-col
                  cols="12"
                  md="2"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.citizenship"
                    label="Citizenship*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="2"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.religion"
                    label="Religion*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.street"
                    label="Street*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.barangay"
                    label="Barangay*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.city"
                    label="City*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.province"
                    label="Provice*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.region"
                    label="Region*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.zip_code"
                    label="Zip Code*"
                    required
                  ></v-text-field>
                </v-col>
                
          </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
        <td>{{ item.student_id }}</td>
        <td>{{ item.student_lrn }}</td>
        <td>{{ item.grade_level }}</td>
        <td>{{ item.strand }}</td>

        <td>
          <v-icon class="me-2" size="large" style="color: #2F3F64" @click="editItem(item)">mdi-information</v-icon>
        </td>

      </tr>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    search: '',
    search_log: '',
    dialog: false,
    dialogDelete: false,
    logs: [],
    consultatioon_headers: [
      { title: 'Student ID', align: 'start', key:'student_id'},
      { title: 'Diagnosis'},
      { title: 'Medicine' },  
      { title: 'Blood Pressure' }, 
      { title: 'Pulse Rate' },   
      { title: 'Oxygen Sat' },   
      { title: 'Temperature' },   
      { title: 'Treatment' },  
      { title: 'Time-In' },
      { title: 'Time-Out' },
      { title: 'Actions', sortable: false }, 
    ],
    headers: [
      { title: 'Name', align: 'start', key: 'full_name' },
      { title: 'Student ID', key: 'student_id' },
      { title: 'LRN', key: 'student_lrn' },
      { title: 'Grade Level', key: 'grade_level' },
      { title: 'Actions', sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      student_id: '',
      student_lrn: '',
      grade_level: '',
      strand: '',
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      extension: '',
      sex_at_birth: '',
      birth_date: '',
      birth_place: '',
      civil_status: '',
      citizenship: '',
      religion: '',
      street: '',
      barangay: '',
      city: '',
      province: '',
      region: '',
      zip_code: '',
    },
    defaultItem: {
      student_id: '',
      student_lrn: '',
      grade_level: '',
      strand: '',
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      extension: '',
      sex_at_birth: '',
      birth_date: '',
      birth_place: '',
      civil_status: '',
      citizenship: '',
      religion: '',
      street: '',
      barangay: '',
      city: '',
      province: '',
      region: '',
      zip_code: '',
    },
  }),

  computed: {
    displayedLogs() {
      const searchTerm = this.search_log.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
        return this.logs.filter(log =>
          Object.values(log).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        )
      );
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add Student' : 'Edit Student Information';
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) => {
        const fullName = `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.toLowerCase();
        return Object.values(student).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        ) || fullName.includes(searchTerm);
      });
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {

      let students = [
        {
          student_id: 1,
          student_lrn: 2222,
          grade_level: 11,
          strand: 'ICT',
          email: 'peter@gmail.con',
          first_name: 'Peter',
          middle_name: 'Doe',
          last_name: 'Doe',
          extension: '',
          sex_at_birth: 'Male',
          birth_date: '07-30-1994',
          birth_place: 'San Fernando',
          civil_status: 'Single',
          citizenship: 'Filipino',
          religion: 'INC',
          street: '1910',
          barangay: 'Old Cabalan',
          city: 'Olongapo',
          province: 'Zambales',
          region: '3',
          zip_code: '2200',
        },
        {
          student_id: 2,
          student_lrn: 3333,
          grade_level: 12,
          strand: 'ICT',
          email: 'smith@gmail.con',
          first_name: 'John',
          middle_name: 'Doe',
          last_name: 'Smith',
          extension: '',
          sex_at_birth: 'Male',
          birth_date: '07-30-1994',
          birth_place: 'San Fernando',
          civil_status: 'Single',
          citizenship: 'Filipino',
          religion: 'INC',
          street: '1910',
          barangay: 'Old Cabalan',
          city: 'Olongapo',
          province: 'Zambales',
          region: '3',
          zip_code: '2200',
        },
      ];

      this.students = students.filter(student => student.grade_level > 10);

      axios.get('http://127.0.0.1:8000/api/consultation-records')
        .then(response => {
          // Handle successful response
          this.logs = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('There was an error!', error);
      });

    },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    
      this.search_log = '' + item.student_id;
    },
    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.students.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;

}

</style>
