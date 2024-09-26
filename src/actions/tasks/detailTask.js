/* eslint-disable prettier/prettier */
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect, useState} from  "react";
import { confirm, error as errorSwal, success } from "../../components/sub/swal";
import { env } from "../../../_config";

export const detailTask = ()=>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const toggleLoading = ()=> setLoading(e=> !e)
  const [error, setError] = useState(null)

  const url = env.API_URL+'/todo/task/'

  const doDetail = async (id)=>{
      let resp

      toggleLoading()
      resp = await axios.get(url+id).then(dt => {
        // let param = dt.data
        setData(dt.data)

        console.log(param)
        toggleLoading()
        return param
      }).catch(err=>{
        let msg = ''
        if (err.status == 400) {
          let field = Object.keys(err.response.data.data)[0]
          msg = field+ ': '+err.response.data.data[field][0]
        }else{
          console.log(err)
          msg = err.response.data
        }

        errorSwal(msg)
      })
  }

  return  {data, loading, error, doDetail}
}
