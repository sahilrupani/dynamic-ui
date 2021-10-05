import React, {useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../../Css/CustomSettings.module.css'
import '../../Css/Common.css'
import Toggle from 'react-toggle'
import BackgroundListModal from '../Modals/BackgroundListModal'


function SingleProcessingCustomSettings(props) {

    const cookie = key=>((new RegExp((key || '=')+'=(.*?); ','gm')).exec(document.cookie+'; ') ||['',null])[1]

    const [backgroundId,setBackgroundId] = useState(929)
    const [checkWindowTransparency,setCheckWindowTransparency] = useState(false)
    const [checkColorEnhancement,setCheckColorEnhancement] = useState(false)
    const [checkBlurNumberPlate,setCheckBlurNumberPlate] = useState(false)
    const [checkWindowCorrenction,setCheckWindowCorrenction] = useState(false)
    const [selectedLogoFile,setSelectedLogoFile] = useState(null)
    const [showlogoCropModal,setShowlogoCropModal] = useState(false)
    const [logoUrl,setLogoUrl] = useState('')
    const [croppedImageUrl,setCroppedImageUrl] = useState(null)
    const [isSolidBackgrounds,setisSolidBackgrounds] = useState(false)
    const [bgList,setBgList] = useState([])
    const [favBgList,setFavBgList] = useState([])
    const [bgCredit, setBgCredit] = useState(null)
    const [showBackgroundList, setShowBackgroundList] = useState(false)


    useEffect(() => {
        axios({
            'method':"GET",
            'url':process.env.REACT_APP_BASEURL + `/v2/backgrounds/fav-ent-bgs?auth_key=${cookie('auth_token')}`
        })
        .then((res) => {

            setBgList(res?.data?.data?.spynelist)
            setFavBgList(res?.data?.data?.fav_list)
        })
    })


    const singleUploadCarApi = (i) => {
        this.setState({
            spinner: true,
            hideLogo:true,
            cropperList:[],
            cropConst:true
        });
        
        let auth_token = this.cookie('auth_token')
        let enterprise_id = this.cookie('enterpriseId')
        const fd = new FormData();
        fd.append("image", props.filesList[0].file);
        fd.append("optimization",false)
        fd.append("background_id", this.state.background_id);
        fd.append("window_status",this.state.checkWindowTransparency ? 'inner' : 'outer');
        fd.append("is_color",this.state.checkColorEnhancement);
        fd.append("number_plate_blur",this.state.checkBlurNumberPlate);
        fd.append("window_correction",this.state.checkWindowCorrenction)
        fd.append("prod_cat_id", "cat_d8R14zUNE")
        fd.append("auth_key", auth_token)
        fd.append("prod_sub_cat_id", "prod_Gcg69Rkxa")
        fd.append("enterprise_id", enterprise_id)
        fd.append('processingType', 'REALTIME')
        fd.append('source', 'SINGLEPROCESS')
        fd.append('frame_seq_no',1)
        fd.append("wall_url","0");
        fd.append("appyType","VS")
        fd.append("custom_wall","null")
        fd.append("height","null")
        

        if(this.state.selectedLogoFile !== null){
            fd.append("logo_number_plate",this.state.selectedLogoFile);
        }

        axios.post( process.env.REACT_APP_BASEURL + `/v2/image/transform`,fd)
        .then((resp) => {
            if(resp.status == 200){
                props.handleApiResponse(resp?.data)
                this.state.cropperList.unshift([resp.data.output_image_lres_url,[0,0,0,0]])
                this.setState({ 
                    url:resp.data.output_image_lres_url,
                    orgImgShow: true,
                    processing: false,
                    loader: false,
                    editedState: true,
                    uploadPercentage: 0,
                    tabIndex: 1,
                    spinner:false,
                    toggleStatus:true,
                    toggleChange:true,
                    isEditingFinish:true,
                    waterMarkImg:resp.data.watermark_image,
                    isDownload: true,
                    urlDownload: resp.data.output_image_hres_url,
                    project_id: resp.data.project_id,
                    sku_id: resp.data.sku_id,
                    singleImage_Id:resp.data.image_id,
                    tempref:this.state.cropperList[0][0],
                    imageId:resp.data.image_id
                    });
                
                window.localStorage.setItem("car-replacement-original-url", resp.data.input_image_hres_url)
                window.localStorage.setItem("car-replacement-edited-url",resp.data.output_image_lres_url)
                window.sessionStorage.setItem("lastEditedImage", resp.data.output_image_lres_url)
                window.sessionStorage.setItem("lastRawImage",resp.data.input_image_hres_url)
                window.sessionStorage.setItem("image_name",resp.data.image_name)
            }
        })

    }

    const numberPlateLogoFileHandler = (event) => {
        
        var file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
        this.setState(
            {
                logoUrl: [reader.result],
                hideLogo:false,
                showlogoCropModal: !this.state.showlogoCropModal
            },
        );
        }.bind(this);
        setLogoUrl(URL.createObjectURL(event.target.files[0]))
        
    };

    const saveCroppedImage = () => {
        const objectURL = URL.createObjectURL(this.state.croppedLogo)
        this.setState({
            selectedLogoFile:this.state.croppedLogo,
            logoUrl:objectURL,
            showlogoCropModal:false
        })
    }

    const handleCroppedLogoBlob = (blob,croppedImageUrl) => {
        this.setState({
            croppedLogo:blob,
            croppedImageUrl: croppedImageUrl
        })
    }

    const handleCropModal = () =>{
        this.setState({
            showlogoCropModal:false
        })
    }

    const handleBgList=(i) =>{
        const fd = new FormData()
        let auth_key = cookie('auth_token')
        fd.append("auth_key", auth_key)
        fd.append("background_id",this.state.bg_list[i]['image_id'])
        fd.append("favourable","true")
        fd.append("primary","false")
        axios({
            'method':"POST",
            'url':process.env.REACT_APP_BASEURL + '/api/v2/backgrounds/updatefavbg',
            "data":fd
        })
        .then((res) => {
            console.log(res.data.status)
            if (res.data.status==200){
                let sliced=bgList.splice(i,1)
                favBgList.unshift(sliced[0])
            }
            
        })
        
    }
    const handlefavList= (i) =>{

        console.log(this.state.fav_list[i]['image_id'])
        const fd = new FormData()
        let auth_key = cookie('auth_token')
        fd.append("auth_key", auth_key)
        fd.append("background_id",this.state.fav_list[i]['image_id'])
        fd.append("favourable","false")
        fd.append("primary","false")
        axios({
            'method':"POST",
            'url':process.env.REACT_APP_BASEURL + '/v2/backgrounds/updatefavbg',
            "data":fd
        })
        .then((res) => {
            console.log(res.data.status)
            if (res.data.status==200){
                let sliced=favBgList.splice(i,1)
                bgList.unshift(sliced[0])
            }
        })
    }

    const fetchBackground = () => {
        axios({
            'method':"GET",
            'url':process.env.REACT_APP_BASEURL + `/v2/backgrounds/fav-ent-bgs?auth_key=${cookie('auth_token')}`
        })
        .then((res) => {

            setBgList(res?.data?.data?.spynelist)
            setFavBgList(res?.data?.data?.fav_list)
        })
    }

    const handleBackground = (imageId, imageCredit) => {
        setBackgroundId(imageId)
        setBgCredit(imageCredit)
    }

    const handleBackgroundList = () => {
        setShowBackgroundList(!showBackgroundList)
      }
  
    const hideList = () => {
        setShowBackgroundList(!showBackgroundList)
      }

    return (
        <div>
            {/* Upload Automobile Photo Optmizer */}
            <section className={[styles['upload-screen'],''].join(' ')}>
                <div className={[styles[''],'container-common'].join(' ')}>
                    <div className={[styles[''],'row'].join(' ')}>
                        <div className={[styles['left-image-part'],'col-md-6 left-image-part'].join(' ')}> 
                            <ul>
                                <li><p><img src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/static/BackgroundReplacement/bulkprocessingv2/credits.png"/> <span> Get Free Credits</span></p></li>
                                <li><p><img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/upload.png"/> <span> Get Free Credits</span></p></li>
                            </ul>
                            <div className={[styles['image-area'],'row m-0'].join(' ')}>
                                <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/gradient-1.png"/>
                                <div className={[styles['toggle-section'], "sec-2-toggle"].join(' ')}>
                                    <p className="mr-5 mt-2">Original</p>
                                    <label className="mt-2">
                                        <Toggle  icons={false}  />
                                    </label>
                                    <p className="ml-5 mt-2">Edited</p>
                                </div>
                            </div>
                        </div>
                        {/* Image Upload Area End  */}
                        <div className={[styles['right-content-part'],'col-md-6 right-content-part'].join(' ')}> 
                            <div className={[styles['right-content-area'],'row m-0 '].join(' ')}>
                                
                                    <ul className={[styles['tab-btns'],'col-md-12'].join(' ')}>
                                        <li><button className={[styles['active'],''].join(' ')}>Virtual Studio</button></li>
                                        <li><button className={[styles[''],''].join(' ')}>Custom Walls</button></li>
                                    </ul>
                                    <div className={[styles['main-bg-row'],'row m-0'].join(' ')}>
                                        {/* Solid Background Row  */}
                                        {isSolidBackgrounds ? 
                                            <div className={[styles['solid-bg'],'col-md-11 col-lg-11'].join(' ')}>
                                                <h6>Solid color <span>Backgrounds <i class="fa fa-info-circle" aria-hidden="true"></i> </span> <span className={styles['picker']}> Colour Picker <div className={[styles['color-picker']]}></div></span></h6>
                                                <div className={[styles['solid-bg-image'],'row m-0'].join(' ')}>
                                                    <div className={[styles['solid-image'],styles['active'],'active'].join(' ')}>
                                                        <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/transparent.png"/>
                                                        <p>Transparent</p>
                                                    </div>
                                                    <div className={[styles['solid-image'],''].join(' ')}>
                                                        <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/gradient-1.png"/>
                                                        <p>Gradient 1</p>
                                                    </div>
                                                    <div className={[styles['solid-image'],''].join(' ')}>
                                                        <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/transparent.png"/>
                                                        <p>Transparent</p>
                                                    </div>
                                                    <div className={[styles['solid-image'],''].join(' ')}>
                                                        <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/gradient-1.png"/>
                                                        <p>Gradient 1</p>
                                                    </div>
                                                </div> 
                                            </div>
                                            :
                                            null
                                        
                                        
                                        // <div className={[styles['solid-arrow'],'col-md-1 col-lg-1'].join(' ')}><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
                                        }   
                                        {/* Spyne's Background Row  */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12'].join(' ')}>
                                            <h6>Spyne’s <span>Backgrounds </span></h6>
                                            <div className={[styles['solid-bg-image2'],'row m-0'].join(' ')}>
                                                {bgList.slice(0,9).map((e,i) => {
                                                    return <div className={backgroundId === e.image_id ? [styles['solid-image'],styles['active'],'solid-image active'].join(' ') : [styles['solid-image'],'solid-image'].join(' ')} onClick={()=>handleBackground(e.image_id,e.image_credit)}>
                                                                <img src={e.image_url} />
                                                                <p>{e.background_name} </p>
                                                                <p className={[styles['fav-icon'],'fav-icon'].join(' ')}> 
                                                                    <i className={[styles['heart'],'fa fa-heart'].join(' ')}  aria-hidden="true"></i>
                                                                </p>
                                                            </div>
                                                })}
                                                
                                                
                                                <div className={[styles['spyne-image'],'solid-image'].join(' ')} onClick={handleBackgroundList}>
                                                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/more-bg.png"/>
                                                    <h6>50+ more</h6>
                                                </div>
                                            </div> 
                                            <h5><i class="fa fa-heart" aria-hidden="true"></i> Click on heart tab to add as your favourite</h5>
                                        </div> 
                                        {/* Choose your number plate  */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12 border-0'].join(' ')}>
                                            <h6><span>Choose Your Number Plate </span>(+1 Credit) </h6>
                                            <div className={[styles['number-plate'],'row m-0'].join(' ')}>
                                                <div className={[styles['solid-image'],styles['active'],'col'].join(' ')}>
                                                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/blurr.png"/>
                                                    <p><input type="checkbox"/> Number Plate Blur</p>
                                                </div>
                                                <div className={[styles['or-area'],'col-md-2'].join(' ')}><span>OR</span></div>
                                                <div className={[styles['solid-image'],'col'].join(' ')}>
                                                    <img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/plate-logo.png"/>
                                                    <p><input type="checkbox"/> Number Plate Logo</p>
                                                </div> 
                                            </div> 
                                        </div>
                                        {/* Upload Number Plate Logo */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12 border-0'].join(' ')}>
                                            <h6><span>Upload Number Plate Logo</span> </h6>
                                            <div className={[styles['number-logo'],'row m-0'].join(' ')}>
                                                <div className={[styles['number-logo-upload'],'col-md-6'].join(' ')}>
                                                    <p>No File Chosen</p>
                                                    <small>Drag & drop here. <b>OR</b> <span>Browse Files</span></small>
                                                </div> 
                                            </div> 
                                        </div>
                                        {/* Add Brand Logo */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12 border-0'].join(' ')}>
                                            <h6><span>Add Brand Logo</span> </h6>
                                            <div className={[styles['number-logo'],'row m-0'].join(' ')}>
                                                <div className={[styles['number-logo-upload'],'col-md-6'].join(' ')}>
                                                    <p>No File Chosen</p>
                                                    <small>Drag & drop here. <b>OR</b> <span>Browse Files</span></small>
                                                </div> 
                                                <div className={[styles['solid-bg-image'],'col-md-6'].join(' ')}>
                                                    <div className={[styles['logo-image'],''].join(' ')}>
                                                        <img className={[styles['active'],''].join(' ')} src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/top-left.png"/>
                                                        <p>top left</p>
                                                    </div>
                                                    <div className={[styles['logo-image'],''].join(' ')}>
                                                        <img className={[styles[''],''].join(' ')} src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/top-right.png"/>
                                                        <p>top right</p>
                                                    </div>
                                                    <div className={[styles['logo-image'],''].join(' ')}>
                                                        <img className={[styles[''],''].join(' ')} src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/bottom-left.png"/>
                                                        <p>bottom-left</p>
                                                    </div>
                                                    <div className={[styles['logo-image'],''].join(' ')}>
                                                        <img className={[styles[''],''].join(' ')} src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/bottom-right.png"/>
                                                        <p>bottom-right</p>
                                                    </div>
                                                </div> 
                                            </div> 
                                        </div>
                                        {/* Background Blur */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12 border-0'].join(' ')}>
                                            <h6><span>Background Blur</span> </h6>
                                            <div className={[styles['number-logo'],'row m-0'].join(' ')}>
                                                <div className={[styles['bg-blurr'],'col-md-3 bg-blurr bg-blurr2'].join(' ')}>
                                                    <input type="checkbox" id="noblur"  name="Enhancements" value=""/>
                                                    <label for="noblur">No Blur</label>
                                                </div> 
                                                <div className={[styles['bg-blurr'],'col-md-3 bg-blurr bg-blurr2'].join(' ')}>
                                                    <input type="checkbox" id="low"  name="Enhancements" value=""/>
                                                    <label for="low">Low Blur</label>
                                                </div> 
                                                <div className={[styles['bg-blurr'],'col-md-3 bg-blurr bg-blurr2'].join(' ')}>
                                                    <input type="checkbox" id="high"  name="Enhancements" value=""/>
                                                    <label for="low">High Blur</label>
                                                </div> 
                                            </div> 
                                        </div>
                                        {/* Background Blur */}
                                        <div className={[styles['solid-bg'],'col-md-12 col-lg-12 border-0'].join(' ')}>
                                            <h6><span>Enhancements</span> </h6>
                                            <div className={[styles['number-logo'],'row m-0'].join(' ')}>
                                                <div className={[styles['bg-blurr'],'col-md-5 bg-blurr'].join(' ')}>
                                                    <input type="checkbox" id="color"  name="Enhancements" value=""/>
                                                        <label for="color"> Colour Enhancements</label>
                                                </div> 
                                                <div className={[styles['bg-blurr'],'col-md-4 bg-blurr'].join(' ')}>
                                                    <input type="checkbox" id="window" name="Correction" value=""/>
                                                        <label for="window"> Window Correction </label>
                                                </div> 
                                                <div className={[styles['bg-blurr'],'col-md-3 bg-blurr'].join(' ')}>
                                                    <input type="checkbox" id="check" name="Shadow" value=""/>
                                                        <label for="check"> Shadow </label>
                                                </div> 
                                                <button><img src="https://storage.googleapis.com/spyne-website/self-serve/Automobile/click.png"/> Create Magic</button>
                                            </div> 
                                            
                                        </div>


                                    </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //Upload Automobile Photo Optmizer */}

            <BackgroundListModal 
                handleBackground={handleBackground}
                handleBackgroundList={handleBackgroundList}
                hideList = {hideList}
                showBackgroundList={showBackgroundList}
                bgList={bgList}
                favBgList={favBgList}
            />
            
        </div>
    )
}

export default SingleProcessingCustomSettings
