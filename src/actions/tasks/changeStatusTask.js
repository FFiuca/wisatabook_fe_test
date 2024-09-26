/* eslint-disable prettier/prettier */
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect, useState} from  "react";
import { confirm, error as errorSwal, success } from "../../components/sub/swal";
import { env } from "../../../_config";

export const changeStatusTask = ()=>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const toggleLoading = ()=> setLoading(e=> !e)
  const [error, setError] = useState(null)

  const url = env.API_URL+'/todo/task/'

  const doChangeStatus = async (id, param)=>{
    let resp

      toggleLoading()
      resp = await axios.patch(url+id+'/change_status/', param, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(dt => {
        param = dt.data
        setData(param)

        console.log(param)
        toggleLoading()
        return param
      }).catch(err=>{
        let msg = ''
        if (err.status == 400) {
          let field = Object.keys(err.response.data.data)[0]
          msg = field+ ': '+err.response.data.data[field][0]
        }else{
          msg = err.response.data
        }

        errorSwal(msg)
      })
  }

  return  {data, loading, error, doChangeStatus}
}
