package com.joer.boge.kyrmtp;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.RadioButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.tencent.TIMCallBack;
import com.tencent.TIMConversation;
import com.tencent.TIMConversationType;
import com.tencent.TIMCustomElem;
import com.tencent.TIMElem;
import com.tencent.TIMElemType;
import com.tencent.TIMFaceElem;
import com.tencent.TIMFriendshipManager;
import com.tencent.TIMGroupEventListener;
import com.tencent.TIMGroupManager;
import com.tencent.TIMGroupSystemElem;
import com.tencent.TIMGroupTipsElem;
import com.tencent.TIMGroupTipsElemMemberInfo;
import com.tencent.TIMGroupTipsType;
import com.tencent.TIMManager;
import com.tencent.TIMMessage;
import com.tencent.TIMMessageListener;
import com.tencent.TIMTextElem;
import com.tencent.TIMUser;
import com.tencent.TIMUserStatusListener;
import com.tencent.TIMValueCallBack;
import com.tencent.rtmp.ITXLivePushListener;
import com.tencent.rtmp.TXLiveConstants;
import com.tencent.rtmp.TXLivePushConfig;
import com.tencent.rtmp.TXLivePusher;
import com.tencent.rtmp.ui.TXCloudVideoView;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.joer.boge.kyrmtp.data.IRmtpView;
import com.joer.boge.kyrmtp.data.KYDMBarrageView;
import com.joer.boge.kyrmtp.data.KYRmtpGetBarrage;
import com.joer.boge.kyrmtp.data.KYRmtpMessageBean;
import com.joer.boge.kyrmtp.data.KYRmtpUserInfo;
import com.joer.boge.kyrmtp.data.Retrofit2Utils;
import com.joer.boge.kyrmtp.data.RmtpDataInfo;
import com.joer.boge.kyrmtp.data.SendMessageDialog;
import com.xianzhiapp.R;

import tencent.tls.platform.TLSLoginHelper;

public class KRmtpActivity extends AppCompatActivity implements IRmtpView, View.OnClickListener,ITXLivePushListener , TIMMessageListener, TIMGroupEventListener {
    private float red_all_count=0.00f;
    private String groupId ="";
    private TIMConversation conversation;// 会话
    private int Appid=0;
    private RmtpDataInfo rmtpDataInfoControll;
    private Context context;
    private LinearLayout page1;
    private TextView page1_close,page1_statr_play;
    private EditText page1_title;

    private View page2;
    private TextView btn_page2_message,btn_page2_carame,btn_page2_more,btn_page2_close;
    private PopupWindow mPopupWindow;
    private TextView btn_popup_share,btn_popup_set;


    private PopupWindow mPopupWindow_Barrage;
    private RadioButton radio_a,radio_b,radio_c,radio_d;
    private TextView btn_setbarrage_save;

    private TextView text_name,text_price,text_count;

    private CircleImageView head_image;
    private RecyclerView recyclerView;
    private GalleryAdapter mAdapter;

    private boolean mVideoPublish=false;
    //摄像头前置
    private boolean mFrontCamera = true;
    /** 视频View */
    private TXCloudVideoView mCaptureView;

    private TXLivePushConfig mLivePushConfig;
    private TXLivePusher mLivePusher;

    //美颜，磨皮等级
    private int mBeautyLevel = 5;
    private int mWhiteningLevel = 5;
    //private String rtmpUrl="rtmp://4089.livepush.myqcloud.com/live/4089_d97809345c7c11e791eae435c87f075e?bizid=4089";
    private String rtmpUrl="";
    private TLSLoginHelper loginHelper;
    private ListView messagelist;
    private ChatAdapter chatAdapter;
    private List<KYRmtpMessageBean> messageList=new ArrayList<>();
    private List<String> photoList=new ArrayList<>();
    private SendMessageDialog sendMessageDialog;
    private KYDMBarrageView danmaku_view;

    private String USERID="1000019";
    private String TICKET="93862Dh+QxXsJmXMOzJCgLmzvCdA78Bm6OVk20EZP7Lo9Ugp0So368wBrdtwKhcUHS9Y8Yzjj2/aHuXQvXmo";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            //透明状态栏
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            //透明导航栏
            //getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }
        setContentView(R.layout.activity_krmtp);
        context=this;

        TICKET=getIntent().hasExtra("TICKET")?getIntent().getStringExtra("TICKET"):TICKET;
        USERID=getIntent().hasExtra("USERID")?getIntent().getStringExtra("USERID"):USERID;
        Log.e("======",TICKET);
        Log.e("======",USERID);

        page1= (LinearLayout) findViewById(R.id.page1);
        page1_close= (TextView) findViewById(R.id.page1_close);
        page1_statr_play= (TextView) findViewById(R.id.page1_statr_play);
        page1_title= (EditText) findViewById(R.id.page1_title);
        page1_close.setOnClickListener(this);
        page1_statr_play.setOnClickListener(this);
        recyclerView=(RecyclerView)findViewById(R.id.recyclerView);
        danmaku_view= (KYDMBarrageView) findViewById(R.id.danmaku_view);

        messagelist= (ListView) findViewById(R.id.messagelist);
        page2= findViewById(R.id.page2);
        btn_page2_message= (TextView) findViewById(R.id.btn_page2_message);
        btn_page2_carame= (TextView) findViewById(R.id.btn_page2_carame);
        btn_page2_more= (TextView) findViewById(R.id.btn_page2_more);
        btn_page2_close= (TextView) findViewById(R.id.btn_page2_close);

        btn_page2_message.setOnClickListener(this);
        btn_page2_carame.setOnClickListener(this);
        btn_page2_more.setOnClickListener(this);
        btn_page2_close.setOnClickListener(this);

        text_name= (TextView) findViewById(R.id.text_name);
        text_price= (TextView) findViewById(R.id.text_price);
        text_count= (TextView) findViewById(R.id.text_count);
        head_image= (CircleImageView) findViewById(R.id.head_image);

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(context);
        linearLayoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
        recyclerView.setLayoutManager(linearLayoutManager);
        chatAdapter=new ChatAdapter(this,messageList);
        messagelist.setAdapter(chatAdapter);
        mAdapter = new GalleryAdapter(context, photoList, R.layout.layout_item_gallery_50);
        recyclerView.setAdapter(mAdapter);
        mCaptureView = (TXCloudVideoView) findViewById(R.id.video_view);
        rmtpDataInfoControll=new RmtpDataInfo(this,getApplication(),TICKET,USERID);
        rmtpDataInfoControll.getUserInfo();
        rmtpDataInfoControll.getLiveTheme();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.page1_close:
                finish();
                break;
            case R.id.page1_statr_play://开播按钮
                if (TextUtils.isEmpty(rtmpUrl)){
                    Toast.makeText(getApplicationContext(), "数据获取中...", Toast.LENGTH_SHORT).show();
                    return;
                }
                startPublishRtmp();
                page1.setVisibility(View.GONE);
                page2.setVisibility(View.VISIBLE);
                break;
            case R.id.btn_page2_message:
                //sendMessage("joerbgys");
                if (sendMessageDialog==null){
                    sendMessageDialog=new SendMessageDialog(context, new SendMessageDialog.EditBackListener() {
                        @Override
                        public void toSendText(String str) {
                            if (TextUtils.isEmpty(str)){
                                Toast.makeText(context,"请输入发送内容",Toast.LENGTH_SHORT).show();
                                return;
                            }
                            sendMessage(str,true);
                        }
                    });
                }
                sendMessageDialog.showDialog();
                break;
            case R.id.btn_page2_carame://前置后置摄像头切换
                mFrontCamera = !mFrontCamera;
                if (mLivePusher.isPushing()) {
                    mLivePusher.switchCamera();
                } else {
                    mLivePushConfig.setFrontCamera(mFrontCamera);
                }
                //btnChangeCam.setImageResource(mFrontCamera ? R.drawable.camera_change : R.drawable.camera_change2);
                break;
            case R.id.btn_page2_more:
                showPopupMoreView();
                break;
            case R.id.btn_page2_close:
                toFinish();
                break;
            case R.id.btn_popup_share:
                shareText();
                if (mPopupWindow!=null)
                    mPopupWindow.dismiss();
                break;
            case R.id.btn_popup_set:
                if (mPopupWindow!=null)
                    mPopupWindow.dismiss();
                showPopupUserBarrageView();
                break;
            case R.id.btn_setbarrage_save:
                sendBarrage();

                break;
        }
    }



    /**
     * 初始化推流配置
     */
    private void initLivePushConfig() {
        mLivePusher = new TXLivePusher(this);
        mLivePushConfig = new TXLivePushConfig();
        // mBitmap = decodeResource(getResources(), R.drawable.watermark);
        //下面两行，设置转屏
        //mRotationObserver = new RotationObserver(new Handler());
        //mRotationObserver.startObserver();
        mVideoPublish = false;

        Log.e("直播", "推流地址：" + rtmpUrl);//
        Log.e("直播", "推流(录制)地址：" + rtmpUrl + "&record=flv");
        if (TextUtils.isEmpty(rtmpUrl) || (!rtmpUrl.trim().toLowerCase().startsWith("rtmp://"))) {
            mVideoPublish = false;
            Toast.makeText(getApplicationContext(), "推流地址不合法，目前支持rtmp推流!", Toast.LENGTH_SHORT).show();
            return ;
        }
        // mLivePushConfig.setWatermark(mBitmap, 10, 10);
        int customModeType = 0;
        //720p
//		mLivePushConfig.setVideoResolution(TXLiveConstants.VIDEO_RESOLUTION_TYPE_720_1280);
//		mLivePushConfig.setAutoAdjustBitrate(false);
//		mLivePushConfig.setVideoBitrate(1500);

        //设置分辨率为自动模式
        mLivePushConfig.setVideoResolution(TXLiveConstants.VIDEO_RESOLUTION_TYPE_360_640);
        mLivePushConfig.setAutoAdjustBitrate(true);
        mLivePushConfig.setAutoAdjustStrategy(TXLiveConstants.AUTO_ADJUST_BITRATE_STRATEGY_1);
        mLivePushConfig.setMaxVideoBitrate(1000);
        mLivePushConfig.setMinVideoBitrate(500);
        mLivePushConfig.setVideoBitrate(700);
        mLivePushConfig.setVideoFPS(25);
        mLivePushConfig.setCustomModeType(customModeType);
        mLivePushConfig.setPauseImg(300, 10);
        //Bitmap bitmap = decodeResource(getResources(), R.drawable.pause_publish);
        //mLivePushConfig.setPauseImg(bitmap);
        mLivePushConfig.setPauseFlag(TXLiveConstants.PAUSE_FLAG_PAUSE_VIDEO | TXLiveConstants.PAUSE_FLAG_PAUSE_AUDIO);
        mLivePushConfig.setBeautyFilter(mBeautyLevel, mWhiteningLevel);
        mLivePushConfig.setTouchFocus(false);
//        if (HWSupportList.isHWVideoEncodeSupport()) {
//            mLivePushConfig.setHardwareAcceleration(true);
//        }
        mLivePusher.setConfig(mLivePushConfig);
        mLivePusher.setPushListener(this);
        mLivePusher.startCameraPreview(mCaptureView);
    }

    @Override
    public void onResume() {
        super.onResume();
        if (mCaptureView != null) {
            mCaptureView.onResume();
        }
        if (mVideoPublish && mLivePusher != null) {
            mLivePusher.resumePusher();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (mCaptureView != null) {
            mCaptureView.onPause();
        }
        if (mVideoPublish && mLivePusher != null) {
            mLivePusher.pausePusher();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopPublishRtmp();
        if (mCaptureView != null) {
            mCaptureView.onDestroy();
        }
        if (rmtpDataInfoControll!=null)
            rmtpDataInfoControll.destory();
    }

    private void stopPublishRtmp() {
        // StopScreenCapture();
        if (mLivePusher!=null){
            mLivePusher.stopCameraPreview(true);
            mLivePusher.stopScreenCapture();
            mLivePusher.setPushListener(null);
            mLivePusher.stopPusher();
            mCaptureView.setVisibility(View.GONE);
        }

//        if (mBtnHWEncode != null) {
//            mLivePushConfig.setHardwareAcceleration(true);
//            mBtnHWEncode.setImageResource(R.drawable.quick);
//        }
//        mBtnPlay.setImageResource(R.drawable.play_start);
        if (mLivePushConfig != null) {
            mLivePushConfig.setPauseImg(null);
        }

        if (page1!=null&&page2!=null){
            //停止直播后，显示直播按钮
            page1.setVisibility(View.VISIBLE);
            page2.setVisibility(View.GONE);
        }

    }

    /**
     * 开启推流
     * @return
     */
    private boolean startPublishRtmp() {
        // mLivePusher.startScreenCapture();
        //mLivePusher.startPusher(rtmpUrl.trim()+ "&record=flv");
        mLivePusher.startPusher(rtmpUrl.trim());
        //踢出账号在其他登录
        new Handler().postDelayed(new Runnable(){
            public void run() {
                sendMessage("{\"type\":\"PushStart\"}",false);
            }
        }, 2000);
        //mBtnPlay.setImageResource(R.drawable.play_pause);
        return true;
    }


    /**
     * 配置权限
     */
    private void showApplyPermissionDialog() {
        AlertDialog dialog;
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage("直播需要获取您的摄像头、麦克风权限");
        builder.setNegativeButton("取消", null);
        builder.setPositiveButton("好的", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                gotoAppDetailSettingIntent();
                if (dialog != null) {
                    dialog.dismiss();
                }
            }
        });
        dialog = builder.create();
        dialog.show();
    }

    /**
     * 打开应用详情页面intent
     */
    private void gotoAppDetailSettingIntent() {
        Intent localIntent = new Intent();
        localIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (Build.VERSION.SDK_INT >= 9) {
            localIntent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
            localIntent.setData(Uri.fromParts("package", getPackageName(), null));
        } else if (Build.VERSION.SDK_INT <= 8) {
            localIntent.setAction(Intent.ACTION_VIEW);
            localIntent.setClassName("com.android.settings", "com.android.settings.InstalledAppDetails");
            localIntent.putExtra("com.android.settings.ApplicationPkgName", getPackageName());
        }
        startActivity(localIntent);
    }

    @Override
    public void onPushEvent(int event, Bundle param) {
        //提示主播上行出现卡顿
        if(event==TXLiveConstants.PUSH_WARNING_NET_BUSY){
            Toast.makeText(getApplicationContext(), "当前上行网络质量很差，观众端已经出现了卡顿!", Toast.LENGTH_SHORT).show();
        }
        // 错误还是要明确的报一下
        if (event < 0) {
            if (event == TXLiveConstants.PUSH_ERR_OPEN_CAMERA_FAIL || event == TXLiveConstants.PUSH_ERR_OPEN_MIC_FAIL)
                showApplyPermissionDialog();
            else
                Toast.makeText(getApplicationContext(), param.getString(TXLiveConstants.EVT_DESCRIPTION), Toast.LENGTH_SHORT).show();
        }

        if (event == TXLiveConstants.PUSH_ERR_NET_DISCONNECT) {
            stopPublishRtmp();
            mVideoPublish = false;
        } else if (event == TXLiveConstants.PUSH_WARNING_HW_ACCELERATION_FAIL) {
            Toast.makeText(getApplicationContext(), param.getString(TXLiveConstants.EVT_DESCRIPTION), Toast.LENGTH_SHORT).show();
            //mLivePushConfig.setHardwareAcceleration(false);
            //mBtnHWEncode.setImageResource(R.drawable.quick2);
            mLivePusher.setConfig(mLivePushConfig);
            //mHWVideoEncode = false;
        } else if (event == TXLiveConstants.PUSH_ERR_SCREEN_CAPTURE_UNSURPORT) {
            stopPublishRtmp();
        } else if (event == TXLiveConstants.PUSH_ERR_SCREEN_CAPTURE_START_FAILED) {
            stopPublishRtmp();
        } else if (event == TXLiveConstants.PUSH_EVT_CHANGE_RESOLUTION) {
            Log.e("live", "change resolution to " + param.getInt(TXLiveConstants.EVT_PARAM2) + ", bitrate to"
                    + param.getInt(TXLiveConstants.EVT_PARAM1));
        } else if (event == TXLiveConstants.PUSH_EVT_CHANGE_BITRATE) {
            Log.e("live", "change bitrate to" + param.getInt(TXLiveConstants.EVT_PARAM1));
        } else if (event == TXLiveConstants.PUSH_EVT_PUSH_BEGIN) {
            Log.e("开始推流", "开始===");
//            if (livePushUrl != null) {
//                Log.e("开始推流", "开始===");
//                presenter.beginPushRTMP(livePushUrl.getChannel_id());
//            }
        }
    }

    @Override
    public void onNetStatus(Bundle bundle) {

    }

    /**
     * 显示一级弹窗
     */
    private void showPopupMoreView(){
        if (mPopupWindow==null){
            View popupView = getLayoutInflater().inflate(R.layout.layout_popup_more, null);
            btn_popup_share= (TextView) popupView.findViewById(R.id.btn_popup_share);
            btn_popup_set= (TextView) popupView.findViewById(R.id.btn_popup_set);
            btn_popup_share.setOnClickListener(this);
            btn_popup_set.setOnClickListener(this);
            mPopupWindow = new PopupWindow(popupView, LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT, true);
            mPopupWindow.setTouchable(true);
            mPopupWindow.setOutsideTouchable(true);
            mPopupWindow.setBackgroundDrawable(new BitmapDrawable(getResources(), (Bitmap) null));
        }
        if (mPopupWindow!=null) {
            int[] location = new int[2];
            findViewById(R.id.view_bottom).getLocationOnScreen(location);
            int x = location[0];
            int y = location[1];
            mPopupWindow.showAtLocation(getWindow().getDecorView(), Gravity.NO_GRAVITY, DeviceUtils.getScreenWith(this) / 2, y - DeviceUtils.dip2px(this, 72));
        }
    }

    private void showPopupUserBarrageView(){
        if (rmtpDataInfoControll==null)
            return;

        rmtpDataInfoControll.getBarrage();

        View popupView = getLayoutInflater().inflate(R.layout.layout_popup_setbarrage, null);
        radio_a= (RadioButton) popupView.findViewById(R.id.radio_a);
        radio_b= (RadioButton) popupView.findViewById(R.id.radio_b);
        radio_c= (RadioButton) popupView.findViewById(R.id.radio_c);
        radio_d= (RadioButton) popupView.findViewById(R.id.radio_d);
        btn_setbarrage_save= (TextView) popupView.findViewById(R.id.btn_setbarrage_save);
        btn_setbarrage_save.setOnClickListener(this);
        btn_setbarrage_save.setClickable(false);

        mPopupWindow_Barrage = new PopupWindow(popupView, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT, true);
        mPopupWindow_Barrage.setTouchable(true);
        mPopupWindow_Barrage.setOutsideTouchable(true);
        mPopupWindow_Barrage.setBackgroundDrawable(new BitmapDrawable(getResources(), (Bitmap) null));

        int[] location = new int[2];
        findViewById(R.id.view_bottom).getLocationOnScreen(location);
        int x = location[0];
        int y = location[1];
        mPopupWindow_Barrage.showAtLocation(getWindow().getDecorView(), Gravity.NO_GRAVITY, DeviceUtils.getScreenWith(this) / 2, y - DeviceUtils.dip2px(this, 114));

    }

    @Override
    public void getUserInfoSuccess(final KYRmtpUserInfo info) {
        if (info==null)
            return;

        //注册直播
        rtmpUrl=info.getUpstream_address();
        initLivePushConfig();

        //登录云通信

        try {
            Log.e("info.getChannel_id()",info.getSdkappid());
            Appid = Integer.parseInt(info.getSdkappid());
        } catch (NumberFormatException e) {
            e.printStackTrace();
            Toast.makeText(context,"获取云通信信息失败",Toast.LENGTH_SHORT).show();
            return;
        }
        initTXTIM(Appid);
        groupId=info.getRoom_id();
        loginIM(Appid,info.getUser_id(),info.getUsersig(),info.getRoom_id(),info.getNick_name());
//        new Handler().postDelayed(new Runnable() {
//
//            @Override
//            public void run() {
//                loginIM(Appid,info.getUser_name(),info.getUsersig());
//            }
//        }, 10000);

        text_name.setText(info.getLive_user_name());
        //设置红包
        red_all_count=info.getRed_packet();
        text_price.setText("¥ "+red_all_count);
        Glide.with(context).load(info.getUser_thumb()).into(head_image);
    }

    @Override
    public void getUserInfoFail(String msg) {
        Log.e("===========",msg);
        Toast.makeText(context,msg,Toast.LENGTH_LONG).show();
//        new Handler().postDelayed(new Runnable() {
//
//            @Override
//            public void run() {
//                finish();
//            }
//        }, 1000);
    }

    @Override
    public void getBarrageListSuccess(KYRmtpGetBarrage barrage) {
        if (barrage==null)
            return;
        if (!TextUtils.isEmpty(barrage.getBarrage_amount_a())){
            radio_a.setText(barrage.getBarrage_amount_a());
            radio_a.setEnabled(true);
            if ("a".equals(barrage.getSet_barrage())) {
                radio_a.setChecked(true);
            }
        }
        if (!TextUtils.isEmpty(barrage.getBarrage_amount_b())){
            radio_b.setText(barrage.getBarrage_amount_b());
            radio_b.setEnabled(true);
            if ("b".equals(barrage.getSet_barrage()))
                radio_b.setChecked(true);
        }
        if (!TextUtils.isEmpty(barrage.getBarrage_amount_c())){
            radio_c.setText(barrage.getBarrage_amount_c());
            radio_c.setEnabled(true);
            if ("c".equals(barrage.getSet_barrage()))
                radio_c.setChecked(true);
        }
        if (!TextUtils.isEmpty(barrage.getBarrage_amount_d())){
            radio_d.setText(barrage.getBarrage_amount_d());
            radio_d.setEnabled(true);
            if ("d".equals(barrage.getSet_barrage()))
                radio_d.setChecked(true);
        }
        btn_setbarrage_save.setClickable(true);

    }

    /**
     * 保存弹幕信息
     */
    private void sendBarrage() {
        String barrage="";
        String barragevalue="";
        if (radio_a.isChecked()) {
            barrage = "a";
            barragevalue=radio_a.getText().toString().trim();
        }
        if (radio_b.isChecked()) {
            barrage = "b";
            barragevalue=radio_b.getText().toString().trim();
        }
        if (radio_c.isChecked()) {
            barrage = "c";
            barragevalue=radio_c.getText().toString().trim();
        }
        if (radio_d.isChecked()) {
            barrage = "d";
            barragevalue=radio_d.getText().toString().trim();
        }
        if (TextUtils.isEmpty(barrage)){
            Toast.makeText(context,"请选择弹幕价格",Toast.LENGTH_SHORT).show();
            return;
        }
        if (rmtpDataInfoControll!=null)
            rmtpDataInfoControll.setBarrage(barrage,barragevalue);

        if (mPopupWindow_Barrage!=null)
            mPopupWindow_Barrage.dismiss();
    }

    @Override
    public void getBarrageListFail(String msg) {
        Toast.makeText(context,msg,Toast.LENGTH_SHORT).show();
    }

    @Override
    public void setBarrageListSuccess(String value) {
        Toast.makeText(context,"设置成功",Toast.LENGTH_SHORT).show();
        //发送云通信消息
        Log.e("接收到新消息","{\"type\":\"barragePriceChanged\",\"val\":\""+value+"\"}");
        sendMessage("{\"type\":\"barragePriceChanged\",\"val\":\""+value+"\"}",false);
    }

    @Override
    public void setBarrageListFail(String msg) {
        Toast.makeText(context,msg,Toast.LENGTH_SHORT).show();
    }

    @Override
    public void getLiveThemeSuccess(String str) {
        if (page1_title!=null)
            page1_title.setText(str);
    }

    //分享文字
    public void shareText() {
        Intent shareIntent = new Intent();
        shareIntent.setAction(Intent.ACTION_SEND);
        shareIntent.putExtra(Intent.EXTRA_TEXT, "快来围观我的直播\n快来围观"+text_name.getText().toString()+"的直播 http://m.9first.com/live/"+USERID);
        shareIntent.setType("text/plain");
        //设置分享列表的标题，并且每次都显示分享列表
        startActivity(Intent.createChooser(shareIntent, "分享到"));
    }

    @Override
    public void onGroupTipsEvent(TIMGroupTipsElem timGroupTipsElem) {
        String username="";
        if (timGroupTipsElem != null) {
            TIMGroupTipsType tipsType = timGroupTipsElem.getTipsType();
            Log.e("云通信", "群事件通知 "+timGroupTipsElem.getOpUser());

            username=timGroupTipsElem.getOpUserInfo().getNickName();
            // 取消管理员
            KYRmtpMessageBean messageBean=null;
            if (tipsType == TIMGroupTipsType.CancelAdmin) {
            } // 加入群组
            else if (tipsType == TIMGroupTipsType.Join) {
                text_count.setText("" + (timGroupTipsElem.getMemberNum() * 9));
//                messageBean=new KYRmtpMessageBean();
//                messageBean.setType(0);
//                messageBean.setUserName("系统消息");
//                messageBean.setContent(timGroupTipsElem.getOpUserInfo().getNickName()+"，来了");
//                Log.e("接收到新消息-------进入",timGroupTipsElem.getOpUserInfo().getNickName()+"");
//                if (chatAdapter!=null)
//                    chatAdapter.addItem(messageBean);

            } // 被踢出群组
            else if (tipsType == TIMGroupTipsType.Kick) {
                text_count.setText("" + (timGroupTipsElem.getMemberNum() - 1));
                messageBean=new KYRmtpMessageBean();
                messageBean.setType(0);
                messageBean.setUserName("系统消息");
                messageBean.setContent(username+"，被踢出群组");
                if (chatAdapter!=null)
                    chatAdapter.addItem(messageBean);
            } // 修改群资料
            else if (tipsType == TIMGroupTipsType.ModifyGroupInfo) {

            } // 修改成员信息【禁言】
            else if (tipsType == TIMGroupTipsType.ModifyMemberInfo) {
                List<TIMGroupTipsElemMemberInfo> listSU = timGroupTipsElem.getMemberInfoList();
                for (TIMGroupTipsElemMemberInfo tim : listSU) {
                    Log.e("禁言", tim.getIdentifier() + "被禁言" + tim.getShutupTime() / 3600 + "小时");
                }
            } // 主动退出群组
            else if (tipsType == TIMGroupTipsType.Quit) {
                text_count.setText("" + (timGroupTipsElem.getMemberNum() * 9 - 1));
                try {
                    messageBean=new KYRmtpMessageBean();
                    messageBean.setType(0);
                    messageBean.setUserName("系统消息");
                    messageBean.setContent(username+"，离开");
                    if (chatAdapter!=null&&!chatAdapter.getItem(chatAdapter.getCount()-1).getContent().equals(messageBean.getContent()))
                        chatAdapter.addItem(messageBean);
                }catch (Exception e){
                    e.printStackTrace();
                }

            } // 设置管理员
            else if (tipsType == TIMGroupTipsType.SetAdmin) {

            }
        }
    }


    @Override
    public boolean onNewMessages(List<TIMMessage> msgs) {
        //是否添加消息列表项
        boolean is=false;
        KYRmtpMessageBean messageBean=null;
        for (TIMMessage msg : msgs) {
            for (int i = 0; i < msg.getElementCount(); i++) {
                messageBean=new KYRmtpMessageBean();
                TIMElem elem = msg.getElement(i);
                // 获取当前元素的类型
                TIMElemType elemType = elem.getType();
                if (msg.getConversation().getType().name().equals("System")&&elemType==TIMElemType.GroupSystem){
                    //messageBean.setType(0);
                    //messageBean.setUserName("系统消息");
                    //messageBean.setContent(((TIMGroupSystemElem) elem).getOpUser()+"来了");
                }

                if (elemType == TIMElemType.Text) {
                    Log.e("接收到新消息-------",msg.getSender()+"   ");
                    Log.e("接收到新消息-------",((TIMTextElem) elem).getText().replaceAll("&quot;","\""));
                    String str=((TIMTextElem) elem).getText().replaceAll("&quot;","\"");
                    messageBean.setType(0);
                    messageBean.setUserName(msg.getSenderProfile() == null ? msg.getSender() : msg.getSenderProfile().getNickName());


                    //新增头像
                    if (str.contains("\"headurl\"")){
                        is=false;
                        try {
                            JSONObject jObject = new JSONObject(str);
                            if (jObject.has("headurl")) {
                                String head=jObject.getString("headurl");
                                //判断是否添加头像
                                if(!mAdapter.isHas(head)) {
                                    mAdapter.add(head);
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }//弹幕
                    else if (str.contains("\"barrageTxt\"")){
                        is=false;
                        try {
                            JSONObject jObject = new JSONObject(str);
                            if (jObject.has("barrageTxt")) {
                                Log.e("",jObject.getString("barrageTxt"));//
                                //弹幕
                                addDanmaku(messageBean.getUserName()+":"+jObject.getString("barrageTxt"),false);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    //红包
                    else if (str.contains("\"redPocketNum\"")){
                        is=true;
                        messageBean.setType(1);
                        try {
                            JSONObject jObject = new JSONObject(str);
                            messageBean.setContent("红包");
                            messageBean.setUserIcon(jObject.has("userIcon")?jObject.getString("userIcon"):"");
                            messageBean.setRedPocketNum((float) jObject.getDouble("redPocketNum"));
                            red_all_count=jObject.has("redPocketNum")?((float) jObject.getDouble("redPocketNum")+red_all_count):red_all_count;
                            text_price.setText("¥"+red_all_count);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }//主播发起退出聊天请求
                    else if (str.contains("\"PushingStop\"")){
                        is=false;
                    }
                    else if(str.contains("\"PushStart\"")){
                        // 被踢下线
                        Toast.makeText(context,"用户被挤下线，请重新登录",Toast.LENGTH_SHORT).show();
                        finish();
                    }
                    else {// 处理文本消息
                        is=true;
                        messageBean.setContent(str);
                        //addDanmaku(str,false);
                    }

                    break;
                }
            }
            if (is&&chatAdapter!=null) {
                chatAdapter.addItem(messageBean);
                if (chatAdapter.getCount()-1>0)
                    messagelist.setSelection(chatAdapter.getCount()-1);
            }
        }
        return false;
    }

    void initTXTIM(int appid){
        TIMManager.getInstance().disableCrashReport();
        TIMManager.getInstance().disableStorage();
        TIMManager.getInstance().init(this);
        // 启用群资料存储
        TIMManager.getInstance().enableGroupInfoStorage(true);
        // 注册消息监听器
        TIMManager.getInstance().addMessageListener(this);
        /**
         * 当有用户被邀请加入群组，或者有用户被移出群组时，群内会产生有提示消息，调用方可以根据需要展示给群组用户
         */
        TIMManager.getInstance().setGroupEventListener(this);
        // 设置用户状态变更监听器，在回调中进行相应的处理
        TIMManager.getInstance().setUserStatusListener(new TIMUserStatusListener() {
            @Override
            public void onForceOffline() {
                // 被踢下线
                Toast.makeText(context,"用户被挤下线，请重新登录",Toast.LENGTH_SHORT).show();
                finish();
            }

            @Override
            public void onUserSigExpired() {
                // 票据过期，需要换票后重新登录
                Toast.makeText(context,"用户票据过期，请重新登录",Toast.LENGTH_SHORT).show();
                finish();
            }
        });
        loginHelper = TLSLoginHelper.getInstance().init(this, appid, 8699, DeviceUtils.getSystemVersion());
        loginHelper.setTimeOut(5000);
    }

    protected void loginIM(final int appid,final String userid,final String sign ,final String roomid,final String nickName) {
        Log.e("userid1113", appid+"");
        Log.e("userid1113", userid);
        Log.e("userid1113", sign);
        TIMUser user = new TIMUser();
        user.setIdentifier(userid);
        // 发起登录请求
        TIMManager.getInstance().login(appid, // sdkAppId，由腾讯分配
                user, sign, // 用户帐号签名，由私钥加密获得，具体请参考文档
                new TIMCallBack() {// 回调接口

                    @Override
                    public void onSuccess() {// 登录成功
                        Log.e("userid1113", "登录腾讯云通信成功");
                        setNickName(nickName);
                        addRoom(roomid);
                    }
                    @Override
                    public void onError(int code, String desc) {// 登录失败
                        // 错误码code和错误描述desc，可用于定位请求失败原因
                        // 错误码code含义请参见错误码表
                        Log.e("userid1113", "登录腾讯云通信失败：" + code + desc);
                        Toast.makeText(getApplicationContext(), "连接房间失败！", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void addRoom(final String roomid) {
        TIMGroupManager.getInstance().applyJoinGroup(roomid, "", new TIMCallBack() {
            @Override
            public void onError(int code, String desc) {
                // 接口返回了错误码code和错误描述desc，可用于原因
                // 错误码code列表请参见错误码表
                Log.e("chat", "加入直播聊天失败" + code + desc);
            }

            @Override
            public void onSuccess() {
                Toast.makeText(getApplicationContext(), "连接房间成功！", Toast.LENGTH_SHORT).show();
                conversation = TIMManager.getInstance().getConversation(TIMConversationType.Group, // 会话类型：群组
                        roomid);
                Log.e("chat", "加入成功");
                // sendMessage("大家好，我是XX,初来乍到!");
            }

        });
    }

    protected void setNickName(String nickName) {
        // 设置新昵称为cat
        TIMFriendshipManager.getInstance().setNickName(nickName, new TIMCallBack() {
            @Override
            public void onError(int code, String desc) {
                // 错误码code和错误描述desc，可用于定位请求失败原因
                // 错误码code列表请参见错误码表
                Log.e("chat", "setNickName failed: " + code + " desc");
            }

            @Override
            public void onSuccess() {
                Log.e("chat", "setNickName succ");
            }
        });
    }

    private void sendMessage(final String content,final boolean isShow) {
        Log.e("send", content);
        // 构造一条消息
        TIMMessage msg = new TIMMessage();
        TIMTextElem elem = new TIMTextElem();
        elem.setText(content);
        if (msg.addElement(elem) != 0) {
            Log.d("chat", "addTextElement failed");
            return;
        }

        if (conversation == null) {
            Toast.makeText(getApplicationContext(), "正在连接房间...", Toast.LENGTH_SHORT).show();
            return;
        }
        //btn_half_send.setEnabled(false);
        // 发送消息
        conversation.sendMessage(msg, new TIMValueCallBack<TIMMessage>() {// 发送消息回调
            @Override
            public void onError(int code, String desc) {// 发送消息失败
                // 错误码code和错误描述desc，可用于定位请求失败原因
                // 错误码code含义请参见错误码表
                Log.e("chat", "send message failed. code: " + code + " errmsg: " + desc);
                if (code == 10017) {
                    Toast.makeText(getApplicationContext(), "您已被禁言！", Toast.LENGTH_SHORT).show();
                } else if (code == 10010) {
                    Toast.makeText(context, "该企业已停止直播！", Toast.LENGTH_LONG).show();
                }
                //btn_half_send.setEnabled(true);
            }

            @Override
            public void onSuccess(TIMMessage msg) {// 发送消息成功
                Log.e("chat", "SendMsg ok");
                if (isShow){
                    KYRmtpMessageBean messageBean=new KYRmtpMessageBean();
                    messageBean.setType(0);
                    messageBean.setContent(content);
                    messageBean.setUserName("我");
                    if (chatAdapter!=null){
                        chatAdapter.addItem(messageBean);
                        if (chatAdapter.getCount()-1>0)
                            messagelist.setSelection(chatAdapter.getCount()-1);
                    }

                    if (sendMessageDialog!=null)
                        sendMessageDialog.cancleEditText();
                }
                //et_full_send.setText("");
            }
        });
        //KeyBoardUtils.closeKeybord(et_half_send, this);
    }
    private long mExitTime;
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            return toFinish();
        } else {
            return super.onKeyDown(keyCode, event);
        }
    }

    /**
     * 退出直播
     */
    boolean toFinish(){
        if ((System.currentTimeMillis() - mExitTime) > 2000) {
            mExitTime = System.currentTimeMillis();
            Toast.makeText(context, "再按一次，退出直播", Toast.LENGTH_SHORT).show();
            return true;
        } else {
            Log.e("接收到新消息","{\"type\":\"PushingStop\"}");
            sendMessage("{\"type\":\"PushingStop\"}",false);
            chatAdapter=null;
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    finish();
                }
            }, 520);
            return false;
        }
    }

    /**
     * 向弹幕View中添加一条弹幕
     * @param content
     *          弹幕的具体内容
     * @param  withBorder
     *          弹幕是否有边框
     */
    private void addDanmaku(String content, boolean withBorder) {
        if (danmaku_view!=null)
            danmaku_view.generateItem(content);
//        BaseDanmaku danmaku = danmakuContext.mDanmakuFactory.createDanmaku(BaseDanmaku.TYPE_SCROLL_RL);
//        danmaku.text = content;
//        danmaku.padding = 5;
//        danmaku.textSize = DeviceUtils.sp2px(16,context);
//        danmaku.textColor = Color.WHITE;
//        danmaku.setDuration(new Duration(3000));
//        if (withBorder) {
//            danmaku.borderColor = Color.GREEN;
//        }
//        danmakuView.addDanmaku(danmaku);
    }
}
