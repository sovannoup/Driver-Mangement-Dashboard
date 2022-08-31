<template>
<span v-for="(head, header_index) of header_audit"
        :key="header_index" ref="">
    {{head}}
     
</span>hello
 <!-- <span v-if="item.event== 'deleted' && item.auditable_type=='Manufacture'"> 
                The {{item.auditable_type}} has been deleted
                
								<div> ID : {{item.old_values.id }}</div>	
                 <div> Name : {{ item.old_values.name }}</div>
           </span>

             <span v-if="item.event== 'created' && item.auditable_type=='Manufacture'"> 
                The {{item.auditable_type}} has been created
								<div> ID : {{item.new_values.id }}</div>	
                 <div> Name : {{ item.new_values.name }}</div>
           </span>
 
          <span v-if="item.event== 'updated' && item.auditable_type=='Manufacture'"> 
                The {{item.auditable_type}} has been changed
								<div> ID : {{item.old_values.id ?? 'N/A' }} <i class="lni lni-arrow-right"></i> <span class="badge font-13 bg-info"> {{item.new_values.id ?? 'N/A' }} </span></div>	
                 <div> Name : {{ item.old_values.name }} <i class="lni lni-arrow-right"></i> <span class="badge font-13 bg-info"> {{item.new_values.name }} </span></div>
          </span> -->
<!-- </span>
           -->
</template>

<script>
export default {
  name: "BaseAuditMessage",
 props: {
    header_audit: {
      type: Array,
    },
    items_audit: {
      type: Array,
    },
  },

};
</script>
