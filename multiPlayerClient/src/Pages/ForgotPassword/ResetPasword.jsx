import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../services/api'
import './ResetPasword.css'
const ForgotPassword = () => {

    const navigate = useNavigate()
    const [sendOtpFormVisibility, setSendOtpFormVisibility] = useState(true)
    const [verifyFormVisibility, setVerifyFormVisibility] = useState(false)
    const [resetPasswordFromVisibility, setResetPasswordFromVisibility] = useState(false)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPasssword, setConfirmNewPassword] = useState("")

    const handleSendOtp = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${baseUrl}/sendOtp`, { userName })
        console.log(response.status)
        if (response.status == 200) {
            setSendOtpFormVisibility(false)
            setVerifyFormVisibility(true)
            setResetPasswordFromVisibility(false)
        } else if (response.status == 201) {
            alert(response.data.error)
        }
    }

    const handleVerifyOtp = async () => {
        const response = await axios.post(`${baseUrl}/veryfyOtp`, { userName, otp })

        if (response.status == 200) {
            alert(response.data.message)
            setSendOtpFormVisibility(false)
            setVerifyFormVisibility(false)
            setResetPasswordFromVisibility(true)
        } else if (response.status == 201) {
            alert(response.data.error)
        }
    }

    const handleResetPassword = async () => {
        const response = await axios.post(`${baseUrl}/resetPassword`, { userName, newPassword })
        if (response.status == 200) {
            alert("Password Successfully updated")
            navigate("/")
        }
    }

    const resetFormDetails = () => {
        setSendOtpFormVisibility(true)
        setVerifyFormVisibility(false)
        setResetPasswordFromVisibility(false)
    }

    return (
        <div className='resetPaswordContainer'>
            <div className='resetPaswordContainerSubClass'>
                {sendOtpFormVisibility && <div display={{ display: "none" }}>
                    <form onSubmit={(e) => handleSendOtp(e)}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label className="label">
                                User Name : {` `}
                                <input placeholder='UserName' className="inputField" type='text' onChange={(e) => setUserName(e.target.value.trim())} />
                            </label>
                            <br />
                            <button className="button" >Send Otp</button>
                        </div>
                    </form>
                </div>}
                <br />

                {verifyFormVisibility && <div>
                    <div>Otp has been send to your registered email addres.</div>
                    <br/>
                    <label className="label">
                        Enter Otp : {` `}
                        <input placeholder='Enter OTP' className="inputField" type='text' onChange={(e) => setOtp(e.target.value)} />
                    </label>
                    <br/>
                    <br/>
                    <button className="button" onClick={() => handleVerifyOtp()}> Verify</button>
                </div>}

                <br />
                {resetPasswordFromVisibility && <div>
                    <div>
                        <label className="label">
                            Enter New Password :{` `}
                            <input placeholder='Enter New Password' className="inputField" type="text" onChange={(e) => setNewPassword(e.target.value)} />
                        </label>
                    </div>
                    <br/>
                    <div>
                        <label className="label">
                            Confirm New Paswword :{` `}
                            <input placeholder='Enter Confirm Password' className="inputField" type="text" onChange={(e) => setConfirmNewPassword(e.target.value)} />

                        </label>
                    </div>
                    <br />
                    <div>
                        <button className="button" onClick={() => handleResetPassword()}>Reset Password</button>
                    </div>
                </div>}
                <br/>
                <div>
                    <button className="button" onClick={() => resetFormDetails()}>Reset Form Details</button>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword