import React,{useEffect,useState} from 'react'
import axios from 'axios'
import alertify from 'alertifyjs';
import Dropzone from 'react-dropzone'
import 'alertifyjs/build/css/alertify.css';
import LoginModal from '../Modals/LoginModal';
import SingleProcessingCustomSettings from './SingleProcessingCustomSettings';
import BulkProcessingCustomSettings from './BulkProcessingCustomSettings';
import Styles from '../../Css/UploadScreen.module.css'

function UploadScreen() {

    const cookie = key=>((new RegExp((key || '=')+'=(.*?); ','gm')).exec(document.cookie+'; ') ||['',null])[1]

    const [themeColor, setThemeColor] = useState('')
    const [enterpriseName,setEnterpriseName] = useState('')
    const [favIcon,setFavIcon] = useState('') 
    const [fileList, setFileList] = useState([])
    const [isBulk, setIsBulk] = useState(false)
    const [maxUpload, setMaxUpload] = useState(false)
    const [sampleImages, setSampleImages] = useState([])
    const [isSampleImage, setIsSampleImage] = useState(false)
    const [isImageUploaded,setIsImageUploaded] =useState(true)


    useEffect(() => {
        let domain = window.location.hostname

        // getEnterpriseDetails(domain)
        // getSampleImages()
    })

    const getEnterpriseDetails = (domain) => {
        axios({
            method: "GET",
            url : process.env.REACT_APP_BASEURL + "/v2/enterprise/getByCode",
            params : {
                enterprise_code : domain,
            }
        }).then(resp => {

            if(resp?.data?.status == 200){
                document.documentElement.style.setProperty("--primaryColor",resp.data?.data?.color)
                document.documentElement.style.setProperty("--secondaryColor",resp.data?.data?.secondary_color)
                setThemeColor(resp.data?.data?.color)
                setEnterpriseName(resp.data?.data?.name)
                setFavIcon(resp.data?.data?.fav_icon_url)

                document.cookie = `enterpriseId=${resp.data?.data?.enterprise_id}; path=/`;
                document.cookie = `apiKey=${resp.data?.data?.api_key}; path=/`;
            }else{
                alertify.error('Could not find enterprise details')
            }
        
            
        })
    }

    const multipleFileUpload = (event) => {


        for(let i=0; i<event.length ; i++){
            if(fileList.length < 36){
                if(event.target){
                    let file = {
                        file: event.target.files[i],
                        name: event.target.files[i].name,
                        size: event.target.files[i].size,
                        type: event.target.files[i].type,
                        lastModified: event.target.files[i].lastModified,
                        lastModifiedDate: event.target.files[i].lastModifiedDate,
                        url: URL.createObjectURL(event.target.files[i]),
                        status: 'Uploading',
                        imageId: null,
                        outputImgUrl: null,
                        projectId: null,
                        skuId:null,
                        fullScreenOutput:null,
                    }
                    if (Math.round(file.size / 1024) > 30720) {
                        return;
                    }
                    setFileList([...fileList,file])
                }else{
                    let file = {
                        file: event[i],
                        name: event[i].name,
                        size: event[i].size,
                        type: event[i].type,
                        lastModified: event[i].lastModified,
                        lastModifiedDate: event[i].lastModifiedDate,
                        url: URL.createObjectURL(event[i]),
                        status: 'Uploading',
                        imageId: null,
                        outputImgUrl: null,
                        projectId: null,
                        skuId:null,
                        fullScreenOutput:null,
                    }
                    // let file = event[i]
                    if (Math.round(file.size / 1024) > 30720) {
                        return;
                    }
                   
                    setFileList([...fileList,file])

                }
                if(fileList.length===1)
                {
                    setIsBulk(false)
                }
                else{
                    setIsBulk(true)
                }

                setIsImageUploaded(!isImageUploaded)
            
            }
            else{
                setMaxUpload(true)
            }
            
            
        }
    }

    const handleApiResponse = (resp) => {
        setFileList({
            status: 'Done', 
            url: resp.input_image_hres_url,
            imageId: resp.image_id, 
            projectId: resp.project_id,
            skuId: resp.sku_id,
            outputImgUrl: resp.output_image_lres_url,
            fullScreenOutput:resp.watermark_image,
        })
    }

    const getSampleImages = () => {
        let auth_key = cookie("auth_token")

        axios({
            method: "GET",
            url : "http://35.187.232.242/api/v2/product/fetchImages",
            // data : fd
            params : {
                auth_key : auth_key,
                enterprise_id: 'TaD1VC1Ko',
                prod_cat_id: 'cat_d8R14zUNE'
            }
            
        })
        .then((resp) => {
            if(resp?.data?.status == 200){
                setSampleImages(resp?.data?.data)
                
            }
        })
    }

    const handleSampleImageClick = (url) =>{
        let file = {
            url: url,
            status: 'Uploading',
            imageId: null,
            outputImgUrl: null,
            projectId: null,
            skuId:null,
            fullScreenOutput:null,
        }
        setFileList([...fileList,file])
        setIsSampleImage(!isSampleImage)
    }


    return (
        <>
            <LoginModal />

            {!isImageUploaded ?
                <section className={[Styles['photo-optimizer'],''].join(' ')}>
                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/bottombg.png" className={[Styles['circle-img'],Styles['frame'],''].join(' ')}/>
                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/btmbg2.png" className={[Styles['circle-img2'],Styles['zoom'],''].join(' ')}/>
                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/dots.png" className={[Styles['dot-img'],Styles['swing'],''].join(' ')}/>
                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/dots.png" className={[Styles['dot-img2'],Styles['swing'],''].join(' ')}/>
                    <div className={[Styles[''],'container-automobile'].join(' ')}>
                        <div className={[Styles[''],'row'].join(' ')}>
                            <div className={[Styles['opti-title'],'col-md-6'].join(' ')}>

                                <h1>Automobile <span>Photo Optmizer</span></h1>
                                <p>Create professional Car pictures in seconds <span>For Free </span></p>
                                <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/automobile.png"/>
                            </div>
                            <div className={[Styles['upload-col'],'col-md-5 offset-md-1'].join(' ')}>
                                <div className={[Styles['try-more'],'row m-0'].join(' ')}>
                                    <h5>No image? Try one of these:</h5>
                                    <div className={[Styles['try-more-col'],'col-md-11'].join(' ')} >
                                        <div className={[Styles['try-more-images'],'row'].join(' ')}>
                                            {
                                                sampleImages.slice(0,3).map((e,i) => {
                                                return (
                                                    <div className={[Styles['try-more-col'],'col-md-4'].join(' ')} onClick={() => handleSampleImageClick(e.image_url)}>
                                                        <img src={e.image_url}/>
                                                    </div>
                                                )
                                                })
                                            }
                                            
                                        </div>

                                    </div> 
                                    <div className={[Styles['icons-area'],'col-md-1'].join(' ')}>
                                        <button onClick={getSampleImages}><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                        <button><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>

                                    </div>

                                </div>
                                <div className={[Styles['try-drag-drop'],'row m-0'].join(' ')}>
                                    

                                    <Dropzone onDrop={acceptedFiles => multipleFileUpload(acceptedFiles)} >
                                        {({getRootProps, getInputProps}) => (
                                            <div {...getRootProps({})} className={[Styles['dropzone1'],Styles['dropzone-img'],'col-md-12'].join(' ')}>
                                                <img src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/37820-upload-animation.gif"></img>
                                                <h6>Drag & Drop file here to upload </h6>
                                                <p><span>Browse files</span></p>
                                                <input  onChange={multipleFileUpload}  type="file" {...getInputProps()} />
                                            </div>
                                        )}
                                    </Dropzone>

                                </div>
                                <div className={[Styles['text-signup'],'row m-0'].join(' ')}><p>Sign Up to Claim 5 Free Credits. <a href="#">Sign Up</a></p></div>  
                                
                            </div>

                        </div>
                    </div>
                </section>
                :
                <>
                    {fileList.length === 0 ?
                        <SingleProcessingCustomSettings 
                            fileList={fileList}
                            handleApiResponse={handleApiResponse}
                        />
                        :
                        <BulkProcessingCustomSettings 
                            fileList={fileList}
                            maxUpload={maxUpload}
                        />
                    }
                </>
            }
            
        </>
    )
}

export default UploadScreen
