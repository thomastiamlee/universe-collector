import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    double score = s.nextDouble();
    if (score >= 60) {
      System.out.println("pass");
    }
    else {
      System.out.println("fail");
    }
  }
}
