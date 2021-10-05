import React, { Component } from 'react';
import  {Modal} from 'react-bootstrap'
import styles from '../../Css/BackgroundListModal.module.css'
import axios from 'axios'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';


function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "#fff" }}
        onClick={onClick}
      />
    );
  }
  
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "#fff" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow_1(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "#fff" ,    left: "-19px"}}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow_1(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "#fff" ,right : "-19px"}}
        onClick={onClick}
      />
    );
  }


class BackgroundListModal extends Component {
    constructor(props){
        super(props)
        this.state={
            gifList:[],
            gifUrl: "",
            // file: null,
            listcustomWall:"",
            accordianUuid:"bg",
            favourable:false,
            visualSelection:'virtual_studio'
        }
        this.wallFile=React.createRef()
    }

    componentDidMount = async () => {
        axios.get('https://www.clippr.ai/api/fetch-gif')
            .then(res => {
                this.setState({
                    gifList: res.data
                })
            })
        this.setState({
          gifUrl:this.props.favBgList.length==0?this.props.bgList[0]['gif_url']:this.props.favBgList[0]['gif_url'],
          favourable:this.props.favBgList.length==0?false:true

        })
    }

    handleBackgroundGif = (imageId,imageCredit, gifUrls, favourite ) => {

        this.setState({
            gifUrl: gifUrls,
            favourable:favourite
        }) 
        this.props.handleBackground(imageId,imageCredit)
    }

    customWallselect =(wall_selected)=>{
      this.setState({
        listcustomWall:wall_selected
      })
    }

    render() {
        const settings = {
            // className: "center",
            // dots: true,
            infinite: false,
            slidesToShow:3,
            slidesToScroll: 1,
            // centePadding:"1px",
            // vertical: true,
            // verticalSwiping: true,
            swipeToSlide: true,
            autoplay: false,
            speed: 500,
            // autoplaySpeed: 7000
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          }; 
          const settings_2 = {
            // className: "center",
            // dots: true,
            infinite: false,
            slidesToShow:4,
            slidesToScroll: 1,
            // centePadding:"1px",
            // vertical: true,
            // verticalSwiping: true,
            swipeToSlide: true,
            autoplay: false,
            speed: 500,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ],
            nextArrow: <SampleNextArrow_1 />,
            prevArrow: <SamplePrevArrow_1 />
          };  
        return ( 
                <Modal 
                    show={this.props.showBackgroundList}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                    centered>
                    
                    <Modal.Body>
                        <section className={[styles['perfect-output-1'],'p-0'].join(' ')}>
                            <div className={[styles[''],'container-fluid'].join(' ')}>
                            {
                                this.state.visualSelection==="virtual_studio"?
                                <div className={[styles['choose-output'],'row'].join(' ')}>
                                    {/* <div className={[styles['heading'],'col-md-12'].join(' ')}>
                                        <h3>Choose  <span>your Back</span>ground </h3>
                                    </div> */}
                                    <div className={[styles['bg-recomended-right'],'col-md-7 col-12'].join(' ')}>
                                      <h3>Choose  <span className={styles['border-bt']}>your <span className={styles['colored']}> Background</span></span></h3>
                                        {this.state.gifUrl != '' ?
                                        <img className="" src={this.state.gifUrl} />
                                        :
                                        <img className="" src={this.props.orgUrl} />
                                        }
                                        
                                        <div  className={[styles['perfect-output-images'],'row'].join(' ')}>
                                            <p className={[styles['fav-icon-2'],'mb-4'].join(' ')}>
                                              <span><svg className={styles['']} width="15" height="13" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10.8218 1.16893C9.81275 0.295543 8.27816 0.428357 7.30583 1.44754L7.30561 1.44778L6.86165 1.91251L6.50011 2.29098L6.13856 1.91251L5.69461 1.44778L5.69404 1.44718C4.72427 0.42865 3.18766 0.295373 2.17843 1.16893C0.982641 2.20588 0.91689 4.07852 1.9898 5.20557L10.8218 1.16893ZM10.8218 1.16893C12.0176 2.2059 12.0833 4.07848 11.0083 5.20546L11.0082 5.20557L6.64761 9.77956C6.64758 9.77959 6.64755 9.77963 6.64752 9.77966C6.56285 9.86833 6.43512 9.86833 6.35045 9.77966C6.35042 9.77963 6.35039 9.77959 6.35035 9.77956L1.99001 5.20579L10.8218 1.16893Z" fill={!this.state.favourable?"#ffffff":"#FF0000"} stroke={!this.state.favourable?"#ffffff":"#FF0000"}  />
                                              </svg></span> Click here to mark this background as favourite!
                                            </p>
                                            
                                            <p><span><a onClick={this.props.hideList}>Cancel</a></span> <a onClick={this.props.applyChange}>Apply</a></p>
                                        </div>
                                    </div>

                                    <div className={[styles['bg-recomended-area'],styles['custom-big'],'col-md-5'].join(' ')}>
                                        <Accordion allowZeroExpanded preExpanded={this.props.favBgList.length==0 ? ['bg']:['fav']} >
                                            <AccordionItem uuid="fav" className={styles['bg-accordion-tab']} >
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                      <h3><span className={styles['colored']}>Your Favourite</span><span> Backgrounds</span> <img src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/static/BackgroundReplacement/car-v2/down-arrow.png" /></h3>
                                                      {/* <AccordionItemState>
                                                          {({ expanded }) => (this.props.favBgList.length==0 ? false : true)}
                                                      </AccordionItemState> */}
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className={[styles['bg-recommended'],'row m-0'].join(' ')}>
                                                      {/* <h6>Backgrounds <span>(Recommended)</span></h6> */}
                                                      <ul className={[styles['bg-recomended-images'],''].join(' ')} 
                                                      style={this.props.favBgList.length>4?{height:"420px"}:(this.props.favBgList.length>2?{height:"280px"}:(this.props.favBgList.length==0?{height:"10px"}:{height:"150px"}))}
                                                      >
                                                          {
                                                              this.props.favBgList.map((e,i) => {
                                                                  return(
                                                                      <li className={this.props.background_id == e.image_id ? styles['active-background-sec']:styles['inactive-background-sec']} onClick={()=>this.handleBackgroundGif(e.image_id,e.image_credit, e.gif_url, true)}>
                                                                          <img className="" src={e.image_url}/>
                                                                          <p onClick={()=>this.props.handleCarsFavList(i)} className={[styles['fav-icon'],''].join(' ')}>
                                                                              <svg width="15" height="13" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                  <path d="M10.8218 1.16893C9.81275 0.295543 8.27816 0.428357 7.30583 1.44754L7.30561 1.44778L6.86165 1.91251L6.50011 2.29098L6.13856 1.91251L5.69461 1.44778L5.69404 1.44718C4.72427 0.42865 3.18766 0.295373 2.17843 1.16893C0.982641 2.20588 0.91689 4.07852 1.9898 5.20557L10.8218 1.16893ZM10.8218 1.16893C12.0176 2.2059 12.0833 4.07848 11.0083 5.20546L11.0082 5.20557L6.64761 9.77956C6.64758 9.77959 6.64755 9.77963 6.64752 9.77966C6.56285 9.86833 6.43512 9.86833 6.35045 9.77966C6.35042 9.77963 6.35039 9.77959 6.35035 9.77956L1.99001 5.20579L10.8218 1.16893Z" fill="#FF0000" stroke="#FF0000"/>
                                                                              </svg> 
                                                                          </p>
                                                                          <span>{e.background_name} - {e.image_id}</span>
                                                                      </li>
                                                                  )
                                                                  
                                                              })
                                                          }
                                                      
                                                      </ul>
                                                        {/* <p>Other Backgrounds</p>
                                                        <ul className={[styles['bg-recomended-images'],'border-0 m-0'].join(' ')}>
                                                            <li><img className="" src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/static/BackgroundReplacement/car-v2/1%20wall.jpg"/>
                                                            <span>Sterling Silver</span></li>
                                                            <li><img className="" src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/static/BackgroundReplacement/car-v2/1%20wall.jpg"/>
                                                            <span>Sterling Silver</span></li>
                                                            
                                                        </ul> */}
                                                    </div>
                                                </AccordionItemPanel>
                                              </AccordionItem>
                                              <AccordionItem uuid="bg" className={styles['bg-accordion-tab']}>
                                                  <AccordionItemHeading>
                                                      <AccordionItemButton>
                                                          <h3><span className={styles['colored']}>Spyne’s  </span><span> other Backgrounds</span> <img src="https://storage.googleapis.com/spyne-website/static/website-themes/clippr/static/BackgroundReplacement/car-v2/down-arrow.png" /></h3>
                                                      </AccordionItemButton>
                                                  </AccordionItemHeading>
                                                  <AccordionItemPanel>
                                                  <div className={[styles['bg-recommended'],'row m-0'].join(' ')}>
                                                      <ul className={[styles['bg-recomended-images'],''].join(' ')}
                                                      style={this.props.bgList.length>4?{height:"420px"}:(this.props.bgList.length>2?{height:"280px"}:{height:"150px"})}
                                                      >
                                                          {
                                                              this.props.bgList.map((e,i) => {
                                                                  return(
                                                                      <li className={this.props.background_id == e.image_id ? styles['active-background-sec']:styles['inactive-background-sec']} onClick={()=>this.handleBackgroundGif(e.image_id,e.image_credit, e.gif_url,false)}>
                                                                          <img className="" src={e.image_url}/>
                                                                          <p onClick={()=>this.props.handleCarsBgList(i)} className={[styles['fav-icon'],''].join(' ')}>
                                                                              <svg className={styles['white-icon']} width="15" height="13" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                  <path d="M10.8218 1.16893C9.81275 0.295543 8.27816 0.428357 7.30583 1.44754L7.30561 1.44778L6.86165 1.91251L6.50011 2.29098L6.13856 1.91251L5.69461 1.44778L5.69404 1.44718C4.72427 0.42865 3.18766 0.295373 2.17843 1.16893C0.982641 2.20588 0.91689 4.07852 1.9898 5.20557L10.8218 1.16893ZM10.8218 1.16893C12.0176 2.2059 12.0833 4.07848 11.0083 5.20546L11.0082 5.20557L6.64761 9.77956C6.64758 9.77959 6.64755 9.77963 6.64752 9.77966C6.56285 9.86833 6.43512 9.86833 6.35045 9.77966C6.35042 9.77963 6.35039 9.77959 6.35035 9.77956L1.99001 5.20579L10.8218 1.16893Z" fill="#ffffff" stroke="#ffffff"/>
                                                                              </svg> 
                                                                              <svg className={styles['hoverable-icon']} width="15" height="13" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M6.57489 1.35802L6.57512 1.35779C7.54745 0.338605 9.08204 0.205791 10.0911 1.07918C11.2869 2.11615 11.3526 3.98873 10.2775 5.11571L10.2774 5.11582L5.9169 9.68981C5.8322 9.77861 5.70434 9.77861 5.61964 9.68981L1.2593 5.11603C0.186169 3.98901 0.251851 2.11619 1.44771 1.07918C2.45695 0.205621 3.99356 0.338898 4.96333 1.35743L4.9639 1.35802L5.40785 1.82276L5.7694 2.20123L6.13094 1.82276L6.57489 1.35802Z" fill="white" stroke="#FF0000"/>
                                                                              </svg>
                                                                          </p>
                                                                          <span>{e.background_name} - {e.image_id}</span>
                                                                      </li>
                                                                  ) 
                                                              })
                                                          } 
                                                      </ul>
                                                    </div>
                                                  </AccordionItemPanel>
                                              </AccordionItem>
                                          
                                          </Accordion>



                                        

                                    </div>
                                    







                                </div> 
                        :
                        null
                        }
                            </div>
                        </section>
                        
                    </Modal.Body>

                </Modal>
        );
    }
}
 
export default BackgroundListModal;