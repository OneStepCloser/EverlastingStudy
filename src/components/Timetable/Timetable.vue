<template>
    <div>
        <div v-if="!currMail" class="unauthorised-outer">
            <el-card class="email-card">
                Введите почту:
                <el-input v-model="mail">
                </el-input>
                <el-button @click="auth()">
                    Сохранить
                </el-button>
            </el-card>
        </div>
        <div v-else> {{currMail}} <el-button @click="logout()"><</el-button></div>
        <el-table>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "timetable",
        data(){
            return {
                mail: null
            }
        },
        methods: {
            auth() {
                if(!this.mail.match(/.*@edu\.hse\.ru$|.*@hse\.ru$/) )
                    this.$store.dispatch('showErrorToastWithMessage', 'Введите почту домена @edu.hse.ru или @hse.ru');
                else
                    this.$store.dispatch('addCurrentMail', this.mail);
            },
            logout(){
                this.mail="";
                this.$store.dispatch('removeCurrentMail');
            }
        },
        computed:{
            currMail(){
                return this.$store.getters.getCurrentMail
            }
        }
    }
</script>

<style scoped lang="scss">
    .unauthorised-outer{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.5);
    }
    .email-card{
        width: 40%
    }
</style>