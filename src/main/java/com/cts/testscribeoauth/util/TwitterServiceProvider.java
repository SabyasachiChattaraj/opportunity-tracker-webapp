package com.cts.testscribeoauth.util;

import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;

public class TwitterServiceProvider {

	public TwitterServiceProvider(String apiKey, String apiSecret, String callbackUrl) {
		super();
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;
		this.callbackUrl = callbackUrl;
	}
	private String apiKey;
	private String apiSecret;
	private String callbackUrl;
	
	public String getApiKey() {
		return apiKey;
	}
	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}
	public String getApiSecret() {
		return apiSecret;
	}
	public void setApiSecret(String apiSecret) {
		this.apiSecret = apiSecret;
	}
	public String getCallbackUrl() {
		return callbackUrl;
	}
	public void setCallbackUrl(String callbackUrl) {
		this.callbackUrl = callbackUrl;
	}
	public OAuth10aService getService(){
		return new ServiceBuilder(this.apiKey)
                .apiSecret(this.apiSecret)
                .callback(this.callbackUrl)
                .build(TwitterApi.instance());
	}
	
}
