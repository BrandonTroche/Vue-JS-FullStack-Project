import API from '@/services/api'

export default {
    queryDB(credentials){
        return API().post('labs', credentials)
    }
}