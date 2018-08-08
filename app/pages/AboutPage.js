import _ from 'lodash';
import React from 'react';
import FontAwesome from 'react-fontawesome';


const socialLinks = {
    facebook : {
        iconName : 'facebook',
        link : 'https://www.facebook.com/nir.benyair'
    },
    linkedin : {
        iconName : 'linkedin',
        link : 'https://www.linkedin.com/in/nir-ben-yair-124a59108/',
    },
    github : {
        iconName: 'github',
        link : 'https://github.com/NirBenya'
    },
    email : {
        iconName : 'envelope',
        link : 'mailto:nirbenya@gmail.com'
    }
};

export default () => {

    return(
        <div className="about-page">
          <div className="container">
              {_.map(socialLinks, socialLink => (
                  <a href={socialLink.link} >
                      <FontAwesome size="2x" name={socialLink.iconName} />
                  </a>
              ))}
          </div>
        </div>
    )

};