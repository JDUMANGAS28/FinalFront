<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedProducts"
    :sort-by="[{ key: 'prod_id', order: 'asc' }]"
    
    
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title class="text-h6 font-weight-black " style="color: #2F3F64">Inventory Table</v-toolbar-title>
       <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
          v-model="search"
          class="w-auto mr-4"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <v-dialog v-model="dialog" max-width="800px" max-height="400px">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2 rounded-l"
              color="primary"
              dark
              v-bind="props"
              prepend-icon="mdi-plus"
              >Add Product / Medicine</v-btn
            >
          </template>

          <v-card class="border-s-lg dark" border-info>
            <v-card-title class="text-h4 mt-4" style="color: #2f3f64">{{
              formTitle
            }}</v-card-title>
            <v-divider :thickness="2"></v-divider>
            <v-card-text > 
              <v-container >
                <v-row dense >
                  <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.medicine_name"
                    label="Product Name*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.quantity"
                    label="Quantity*"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.unit"
                    label="Unit*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.size"
                    label="Size*"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.expiration_date"
                    label="Expiration*"
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
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-center">{{ item.medicine_id }}</td>
        <td class="text-center">{{ item.medicine_name }}</td>
        <td class="text-center">{{ item.unit }}</td>
        <td class="text-center">{{ item.size }}</td>
        <td class="text-center">{{ item.quantity }}</td>
        <td class="text-center">{{ item.expiration_date }}</td>
        <td class="text-center"> <v-icon class="me-2" size="small" style="color: #2F3F64" @click="editItem(item)">mdi-pencil </v-icon> <v-icon size="small" style="color: #2F3F64" @click="deleteItem(item)">mdi-delete </v-icon> </td> 
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
    { title: "ID", align: "center", key: "medicine_id" },
      { title: "Name", align: "center", key: "medicine_name" },
      { title: "Unit", align: "center", key: "unit" },
      { title: "Size", align: "center", key: "size" },
      { title: "Quantity", align: "center", key: "quantity" },
      { title: "Expiration Date", align: "center", key: "expiration_date" },
      { title: "Actions", align: "center", sortable: false },
    ],
    product: [],
    editedIndex: -1,
    editedItem: {
      medicine_id: '',
      medicine_name: '',
      unit: '',
      size: '',
      quantity: '',
      expiration_date: '',
    },
    defaultItem: {
      medicine_id: '',
      medicine_name: '',
      unit: '',
      size: '',
      quantity: '',
      expiration_date: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Product" : "Edit Product Information";
    },
    displayedProducts() {
      const searchTerm = this.search.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
      return this.product.filter((product) =>
        Object.values(product).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm)
        )
      );
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
      axios.get('medicines')
        .then(response => {   
          console.log(response);
          // Handle successful response
          this.product = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.log(error);
      });
      this.product.forEach(product => {
          if (product.qty = 0) {
              // Remove the strand property
              product.qty = "Out of Stock";
          }
      });
    },

    editItem(item) {

      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      
    },

    deleteItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.medicine_id = item.medicine_id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      
      this.product.splice(this.editedIndex, 1);

      axios
        .delete("http://127.0.0.1:8000/api/medicines/" + this.medicine_id)
        .then((response) => {
          this.initialize();
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });

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
        axios
          .put(
            "http://127.0.0.1:8000/api/medicines/" + this.editedItem.medicine_id,
            this.editedItem
          )
          .then((response) => {
            this.initialize();
          })
          .catch((error) => {
            // Handle error
            console.error("There was an error!", error);
          });

        Object.assign(this.product[this.editedIndex], this.editedItem);



      } else {

        axios.post('http://127.0.0.1:8000/api/medicines', this.editedItem)
        .then(response => {
          this.initialize();
        }).catch(error => {
          // Handle error
          console.error('There was an error!', error);
        });

      }
      this.close();
    },
  },
};
</script>
<style lang="scss">
.v-data-table {
  height: 100%;
  width: auto;
}
</style>
