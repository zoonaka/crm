const schedule_elem = {
    props: ['json', 'url'],
    emits: ["to_edit", "delete"],
    data() {
        return {
            start_datetime: new Date(),
            end_datetime: new Date(),
        } 
    },


    methods: {
        reload() {
            this.start_datetime = new Date(this.json.schedule.start_datetime * 1000); // local 
            this.end_datetime = new Date(this.json.schedule.end_datetime * 1000); // local
        }
    },

    computed: {
        year() {
            return this.start_datetime.getFullYear();
        },

        month() {
            return this.start_datetime.getMonth() + 1;
        },

        day() {
            return this.start_datetime.getDate();
        },

        start_hour() {
            const hour = this.start_datetime.getHours();
            return (hour < 10 ? "0": "") + hour;
        },

        start_min() {
            const min = this.start_datetime.getMinutes();
            return (min < 10 ? "0": "") + min;
        },

        end_hour() {
            const hour = this.end_datetime.getHours();
            return (hour < 10 ? "0": "") + hour;
        },

        end_min() {
            const min = this.end_datetime.getMinutes();
            return (min < 10 ? "0": "") + min;
        },
    },

    mounted() {
        this.reload();
    },

    watch: {
        json(_new_value, _old_value) {
            this.reload();
        },
    },

    template: `
    <p class="card-text">
    <span v-if="!json.schedule.all_day" class="card-text">{{ start_hour }}:{{ start_min }} - {{ end_hour }}:{{ end_min }} </span>
    {{ json.title }}
    <span class="badge bg-success" @click="()=>{$emit('to_edit', url)}" >{{ $t("labels.edit") }}</span>
    <span class="badge bg-danger"  @click="()=>{$emit('delete', url)}">{{ $t("labels.delete") }}</span>
    </p>
    `
}
