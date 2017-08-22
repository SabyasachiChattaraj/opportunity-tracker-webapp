package com.cts.testscribeoauth.controller;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.bind.annotation.ActionMapping;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

import com.cts.testscribeoauth.util.TwitterServiceProvider;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.util.PortalUtil;

@Controller
@RequestMapping("VIEW")
public class TestScribeOAuthController {
	
	private TwitterServiceProvider twitterServiceProvider;
	
	
	public TwitterServiceProvider getTwitterServiceProvider() {
		return twitterServiceProvider;
	}

	public void setTwitterServiceProvider(TwitterServiceProvider twitterServiceProvider) {
		this.twitterServiceProvider = twitterServiceProvider;
	}

	//private static OAuth10aService service = null;
	
	Log log=LogFactoryUtil.getLog(TestScribeOAuthController.class);
	
	
	@RenderMapping
	public String handleRenderRequest(Model model,RenderRequest renderRequest, RenderResponse renderResponse) throws Exception {
		log.info("handleRenderRequest start");
		try {
			HttpServletRequest httpServletRequest = PortalUtil.getHttpServletRequest(renderRequest);
			httpServletRequest = PortalUtil.getOriginalServletRequest(httpServletRequest);
			String callbackFor = httpServletRequest.getParameter("callback_for");
			String oauthToken = httpServletRequest.getParameter("oauth_token");
			String oauthVerifier = httpServletRequest.getParameter("oauth_verifier");
			log.info("oauthToken :" + oauthToken);
			log.info("oauthVerifier :" + oauthVerifier);
			if (Validator.isNotNull(callbackFor) && callbackFor.equals("twitter")) {
				OAuth10aService service = twitterServiceProvider.getService();
				log.info("Got the Eeq Token!"+service.getRequestToken());
				OAuth1RequestToken auth1RequestToken=new OAuth1RequestToken(oauthToken, StringPool.BLANK);
				final OAuth1AccessToken accessToken = service.getAccessToken(auth1RequestToken, oauthVerifier);
				log.info("Got the Access Token!");
				log.info("(if your curious it looks like this: " + accessToken + ", 'rawResponse'='"
						+ accessToken.getRawResponse() + "')");

				// Now let's go and ask for a protected resource!
				log.info("Now we're going to access a protected resource...");
				final OAuthRequest request = new OAuthRequest(Verb.GET,
						"https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true");
				service.signRequest(accessToken, request);
				final Response response = service.execute(request);
				log.info("Got it! Lets see what we found...");
				JSONObject jsonObject=JSONFactoryUtil.createJSONObject(response.getBody());
				log.info(response.getBody());
				model.addAttribute("email", jsonObject.getString("email","NA"));
				log.info("That's it man! Go and build something awesome with ScribeJava! :)");
				return "loggedin";
			}
			
		} catch (Exception e) {
			log.error("error in handleRenderRequest");
			log.info("Msg : "+e.getMessage());
			log.info("Cause : "+e.getCause());
		}
		return "view";
	}

	/*@ActionMapping(params="login=twitter")
	public void authenticateViaTwitter(ActionRequest actionRequest, ActionResponse actionResponse, Model model) throws Exception {
		service = new ServiceBuilder("u5I9fYgka5qyaKDVYlFP9zptw")
                .apiSecret("swoF54GeLFk1QnHBx6PuzBjCkvhJbEx18Lhwv9E5MnzPOyVB9o")
                .callback("http://uat.indiafirstlife.com/indiaf/web/guest?callback_for=twitter")
                .build(TwitterApi.instance());

        System.out.println("=== Twitter's OAuth Workflow ===");
        System.out.println();

        // Obtain the Request Token
        System.out.println("Fetching the Request Token...");
        final OAuth1RequestToken requestToken = service.getRequestToken();
        System.out.println("Got the Request Token!");
        System.out.println();

        System.out.println("Now go and authorize ScribeJava here:");
        System.out.println(service.getAuthorizationUrl(requestToken));
        actionResponse.sendRedirect(service.getAuthorizationUrl(requestToken));
	}*/
	
	@ActionMapping(params="login=twitter")
	public void authenticateViaTwitter(ActionRequest actionRequest, ActionResponse actionResponse, Model model) throws Exception {
		
		
		/*service = new ServiceBuilder("u5I9fYgka5qyaKDVYlFP9zptw")
                .apiSecret("swoF54GeLFk1QnHBx6PuzBjCkvhJbEx18Lhwv9E5MnzPOyVB9o")
                .callback("http://uat.indiafirstlife.com/indiaf/web/guest?callback_for=twitter")
                .build(TwitterApi.instance());*/
		
		OAuth10aService service = twitterServiceProvider.getService();

        System.out.println("=== Twitter's OAuth Workflow ===");
        System.out.println();

        // Obtain the Request Token
        System.out.println("Fetching the Request Token...");
        final OAuth1RequestToken requestToken = service.getRequestToken();
        System.out.println("Got the Request Token!");
        System.out.println();

        System.out.println("Now go and authorize ScribeJava here:");
        System.out.println(service.getAuthorizationUrl(requestToken));
        actionResponse.sendRedirect(service.getAuthorizationUrl(requestToken));
	}

	public static void main(String[] args) throws Exception {
		  /*final OAuth10aService service = new ServiceBuilder("u5I9fYgka5qyaKDVYlFP9zptw")
	                .apiSecret("swoF54GeLFk1QnHBx6PuzBjCkvhJbEx18Lhwv9E5MnzPOyVB9o")
	                .callback("http://localhost:8080")
	                .build(TwitterApi.instance());
	        final Scanner in = new Scanner(System.in);

	        System.out.println("=== Twitter's OAuth Workflow ===");
	        System.out.println();

	        // Obtain the Request Token
	        System.out.println("Fetching the Request Token...");
	        final OAuth1RequestToken requestToken = service.getRequestToken();
	        System.out.println("Got the Request Token!");
	        System.out.println();

	        System.out.println("Now go and authorize ScribeJava here:");
	        System.out.println(service.getAuthorizationUrl(requestToken));
	        System.out.println("And paste the verifier here");
	        System.out.print(">>");
	        final String oauthVerifier = in.nextLine();
	        System.out.println();

	        // Trade the Request Token and Verfier for the Access Token
	        System.out.println("Trading the Request Token for an Access Token...");
	        final OAuth1AccessToken accessToken = service.getAccessToken(requestToken, oauthVerifier);
	        System.out.println("Got the Access Token!");
	        System.out.println("(if your curious it looks like this: " + accessToken
	                + ", 'rawResponse'='" + accessToken.getRawResponse() + "')");
	        System.out.println();

	        // Now let's go and ask for a protected resource!
	        System.out.println("Now we're going to access a protected resource...");
	        final OAuthRequest request = new OAuthRequest(Verb.GET, "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true");
	        service.signRequest(accessToken, request);
	        final Response response = service.execute(request);
	        System.out.println("Got it! Lets see what we found...");
	        System.out.println();
	        System.out.println(response.getBody());

	        System.out.println();
	        System.out.println("That's it man! Go and build something awesome with ScribeJava! :)");*/
		
		
	}
}
