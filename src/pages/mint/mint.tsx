import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid';
import Web3 from 'web3';
import { useToasts } from 'react-toast-notifications';
import {
  constructMediaData,
  sha256FromBuffer,
  constructBidShares,
} from '@zoralabs/zdk';
import { promisify } from 'util';
import fleekStorage from '@fleekhq/fleek-storage-js';
import fs from 'fs';
import { create } from 'ipfs-http-client';
import { parseEther } from '@ethersproject/units';

import { getBidder, getFileBuffer, getTokenId } from 'utils';

import axios from 'axios';
import MediaABI from 'services/abis/Media.json';
import { MEDIA_ADDRESS, KET_ADDRESS } from 'config';
import { findOrCreateUserData } from 'redux/actions/UserAction';
import { Box } from '@material-ui/core';

import styles from './style.module.scss';

interface MintProps {
  user: any,
  account: any,
  findOrCreateUserData: any,
};
declare let window: any;


const validationSchema = Yup.object().shape({
  media: Yup.mixed().required(),
  token_name: Yup.string().required(),
  token_description: Yup.string().required(),
  // token_price: Yup.string().required()
});

const share = 1;

const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const instance = axios.create({ baseURL: 'http://82.223.25.72:443' })

const Mint: FC<MintProps> = ({ user, account, findOrCreateUserData }) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const { addToast } = useToasts();
  const [curimg, setCurImg] = useState<any>(null);

  useEffect(() => {
    if (account)
      findOrCreateUserData({ id: account });
  }, [account]);


  async function createMedia(
    upload: File,
    name: string,
    description: string,
    price: string,
    fee: any,
  ) {
    
    const buffer: any = await getFileBuffer(upload);
    
    // Generate content hashes
    const contentHash = sha256FromBuffer(Buffer.from(buffer));
    
    console.log(file);
    // Upload files to fleek
    let added = await client.add(buffer)
    const fileUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(fileUrl);
    const metadataJSON = JSON.stringify({
      description: description ? description : '',
      mimeType: upload.type,
      image: fileUrl,
      name: name,
      price: '0.1',
    });

    const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
    added = await client.add(metadataJSON);
    const metadataUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
    // Construct mediaData object
    console.log(metadataUrl);
    // const mediaData = constructMediaData(
    //   fileUrl,
    //   metadataUrl,
    //   contentHash,
    //   metadataHash,
    // );

    // const shares = constructBidShares(
    //   0, // Creator share
    //   100 - parseFloat(fee), // Owner share
    //   parseFloat(fee), // Previous owner share
    // );

    // // Make transaction
    // window.web3 = new Web3(window.ethereum);

    // const mediaContract = await new window.web3.eth.Contract(MediaABI, MEDIA_ADDRESS);
    // const transaction = await mediaContract?.methods.mint(mediaData, shares, { amount: parseEther('0.1'), currency: KET_ADDRESS }).send({ from: account });

    // console.log(transaction);

    // let tokenId: string = await getTokenId(transaction);

    // const createdata = await instance.post(
    //   '/api/mediaController/create',
    //   {
    //     title: name,
    //     description,
    //     price: parseInt('0.1'),
    //     media_url: fileUrl,
    //     metadata_url: metadataUrl,
    //     mimeType: upload.type,
    //     creator: account,
    //     contentHash,
    //     metadataHash,
    //     tokenId,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );

    // console.log(createdata);
    return metadataUrl;
    // Collect fileUrl and metadataUrl from Fleek

  };

  const addOwnedMedia = async (_id: string, media: string) => {
    const { data } = await instance.post(`/api/userController/addownedmedia`,
      {
        _id: _id,
        media: media
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    console.log(data);
  }

  const onSubmit = async ({ token_name, token_description, token_price, media }: any) => {
    console.log(token_price, 'token_price');
    setLoading(true);
    if (!account) {
      setLoading(false);
      addToast('Please Connect Wallet' || 'An error occured', { appearance: 'error' });
      return;
    }
    // try {
      const saveRecord = await createMedia(media, token_name, token_description, '0.1', share);
    //   if (user) {
    //     await addOwnedMedia(user._id, saveRecord._id);
    //     addToast('Successfully created an artwork', { appearance: 'success' });
    //   }
    //   else {
    //     addToast('Account is not valid', { appearance: 'error' });
    //   }
    // } catch (e: any) {
    //   addToast(e.message || 'An error occured', { appearance: 'error' });
    // }
    setLoading(false);
  };

  const dropHandler = useCallback(
    async (acceptedFiles: any[]) => {
      console.log(acceptedFiles);
      const [File] = acceptedFiles;
      const fileName = File.name;
      setValue('media', File);
      setCurImg(URL.createObjectURL(File));
      console.log(URL.createObjectURL(File));
      setFile(File);
      setValue('token_name', fileName);
    },
    [setValue],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType={'multipart/form-data'}
      className={styles.mintform}>

      <Box fontSize='24px' color='white' fontWeight={600} mt='40px' >Upload File</Box>
      <Box mt='20px'>
        <Dropzone
          maxFiles={1}
          accept={[
            'image/png',
            'image/jpeg',
            'image/gif',
            'video/mp4',
            'video/quicktime',
            'audio/mpeg',
            'audio/wav',
            'audio/mp3',
          ]}
          onDrop={acceptedFiles => dropHandler(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles.uploadpanel}>
              <input {...getInputProps()} />

              {curimg ? <img src={curimg} width='330px' height='330px' alt={curimg} /> :
                <>
                  <Box fontSize='20px' color='white' fontWeight={600} mt='48px' >
                    JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                  </Box>

                  <img src="/images/upload/uploadicon.svg" alt="uploadicon" style={{ marginTop: '28px' }} />
                  <Box fontSize='12px' color='white' fontWeight={600} mt='28px'>Drag and Drop File </Box>
                  <Box fontSize='12px' color='white' mt='4px' >
                    or
                    <span style={{ fontWeight: 600, marginLeft: '4px' }}>browse media on your device</span>
                  </Box>
                </>
              }
            </div>
          )}
        </Dropzone>
        {errors.media && (
          <Box fontSize='12px' color='rgb(220 38 38);' fontWeight={700} mt='4px' id="email-error">
            {errors.media.message}
          </Box>
        )}
      </Box>
      <Box mt='48px' >
        <label
          htmlFor="title"
          style={{ color: 'white', fontSize: '24px', fontWeight: 600 }}>
          Name
        </label>
        <Box mt='20px' position='relative'>
          <input
            type="text"
            id="token_name"
            {...register('token_name')}
            className={styles.inputfield}
            placeholder="Item Name"
          />{' '}
          {errors.token_name && (
            <Box fontSize='12px' color='rgb(220 38 38);' fontWeight={700} mt='4px' id="email-error">
              {errors.token_name.message}
            </Box>
          )}
        </Box>
      </Box>
      <Box mt='48px' >
        <label
          htmlFor="title"
          style={{ color: 'white', fontSize: '24px', fontWeight: 600 }}>
          Description
        </label>
        <Box mt='20px' position='relative'>
          <textarea
            id="token_description"
            {...register('token_description')}
            rows={3}
            className={styles.inputfield}
            style={{ resize: 'none', height: "160px" }}
            defaultValue={''}
            placeholder='Decription of your item'
          />
        </Box>
        {errors.token_description && (
          <Box fontSize='12px' color='rgb(220 38 38);' fontWeight={700} mt='4px' id="email-error">
            {errors.token_description.message}
          </Box>
        )}
      </Box>
      <Box display='flex' justifyContent='end' mt='48px' pb='64px' >
        <button
          type="submit"
          className={styles.createbutton}>
          {loading ? 'Creating Item...' : 'Create Item'}
        </button>
      </Box>
    </form >
  );
};

const fromStore = (store: any) => {
  return {
    user: store.UserReducer.user,
  }
}

export default connect(fromStore, { findOrCreateUserData })(Mint)