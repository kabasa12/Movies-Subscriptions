import axios from 'axios';

const getAll = async(url,type) => {
    let resp = await axios.get(url);
    let data = [];
    if(type === "members") {
        resp.data.map(d => {
            data.push({id:d.id,
                       name:d.name,
                       email:d.email,
                       city:d.address.city})
        });
    } else if(type === "movies") {
        resp.data.map(d => {
            let dt = new Date(d.premiered).getFullYear()
            data.push({id:d.id,
                       name:d.name,
                       image:d.image.medium,
                       premiered:dt,
                       genres:[...d.genres]})
        });
    }
    return data;
}

const getById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return resp.data;
}

const getMemberById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return {id:resp.data.id,
            name:resp.data.name,
            email:resp.data.email,
            city:resp.data.address.city};
}
const getByTypeId = (url,typeId,id) => {
    return axios.get(url + `?${typeId}=${id}`);
}

const addObj = (url,obj) => {
    return axios.post(url,obj);
}

const updateById = (url,id,obj) => {
    return axios.put(url + `/${id}`,obj);
}

const deleteById = (url,id) => {
    return axios.delete(url + `/${id}` );
}

export default {getAll,getById,getMemberById}