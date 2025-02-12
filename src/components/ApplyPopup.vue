<template lang="">
    <div class="relative flex justify-center items-center ">
        <div class="bg-black z-40 opacity-70 fixed inset-0 " @click="toggle">
        </div>
        <div class="w-[700px] fixed top-[50%] translate-y-[-50%] z-50 left-[50%] translate-x-[-50%] bg-white rounded-xl p-[20px]">
            <div class="h-[50px] border-b flex items-center justify-between">
                <h2 class="text-[16px] font-semibold">You are applying for a position <span class="text-green-500">{{job?.position}}</span> tại {{job?.business?.name}}</h2>
                <CloseOutlined :style="{fontSize: '20px', cursor: 'pointer'}" @click="toggle"/>
            </div>
            <form action="" class="flex flex-col gap-5 mt-5">
                <div class="flex flex-col gap-2">
                    <label for="" class="text-[14px] font-medium">Full name</label>
                    <input type="text" v-model="applyRef.name" placeholder="Enter fullname" class="px-[10px] py-[5px] outline-none border rounded">
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-[14px] font-medium">Email</label>
                    <input type="text" v-model="applyRef.email" placeholder="Enter email" class="px-[10px] py-[5px] outline-none border rounded">
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-[14px] font-medium">Phone number</label>
                    <input type="text" v-model="applyRef.phone" placeholder="Enter phone number" class="px-[10px] py-[5px] outline-none border rounded">
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-[14px] font-medium">Your CV<span class="text-red-500 text-[10px]">(pdf)</span></label>
                    <input type="file"  class="px-[10px] py-[5px] outline-none border rounded" @change="handleChangeFile">
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-[14px] font-medium">More information</label>
                    <textarea placeholder="Thông tin thêm" v-model="applyRef.cover_letter" name="" id="" cols="30" rows="5" class="px-[10px] py-[5px] outline-none border rounded"></textarea>
                </div>
                <div class="flex items-center gap-5 justify-end">
                    <button class="border-2 border-red-500 px-[10px] py-[5px] rounded font-semibold" @click.prevent="toggle">Huỷ</button>
                    <button class="bg-green-500 text-white px-[10px] py-[5px] rounded font-semibold" @click.prevent="handleApply">Nộp cv</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
    import {CloseOutlined} from "@ant-design/icons-vue"
    import {defineProps, ref, watchEffect} from "vue"
import { useToast } from "vue-toastification";
import { useUserStore } from "../stores/userStore";

    const {toggle, user, job} = defineProps({
        toggle: Function,
        user: Object,
        job: Object,
    })
    const userStore = useUserStore()
    const toast = useToast()
    const applyRef = ref({
        name: "",
        email: "",
        phone: "",
        resume_path: null,
        cover_letter: "",
    })

    watchEffect(() => {
        const apply = user
        if (apply) {
            applyRef.value.name = apply.name
            applyRef.value.email = apply.email
            applyRef.value.phone = apply.phone
        }
    })

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            applyRef.value.resume_path = file;
        } else {
            toast.warning("Vui lòng chọn một tệp PDF.")
        }
    }

    const handleApply = () => {
        const formData = new FormData()
        formData.append('name',applyRef.value.name)
        formData.append('email',applyRef.value.email)
        formData.append('phone',applyRef.value.phone)
        formData.append('resume_path',applyRef.value.resume_path)
        formData.append('cover_letter',applyRef.value.cover_letter)
        if(!applyRef.value.name || !applyRef.value.email || !applyRef.value.phone || !applyRef.value.resume_path || !applyRef.value.cover_letter) {
            toast.warning("Vui lòng điền đủ thông tin")
        }else {
            userStore.actApplyJob(job.id, formData, userStore.accessToken)
            toggle()
        }
    }

</script>
<style lang="">
    
</style>